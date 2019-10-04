import { HttpException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

import {
  BadRequestException,
  InternalException,
  NotFoundException,
} from '@app/exceptions';

export default abstract class BaseService<T extends DeepPartial<T>> {
  constructor(private repository: Repository<T>) {}

  // Executed before the save repository call
  abstract preSaveHook(entity: T): void;

  // Executed before the update repository call
  abstract preUpdateHook(entity: T): void;

  // Executed before the delete repository call
  abstract preDeleteHook(entity: T): void;

  // Executed before the result is returned
  abstract preResultHook(entity: T): void;

  public validId(id: number): boolean {
    return id !== undefined && id > 0;
  }

  private async getRecordById(id: number) {
    // Check if the id is valid
    if (!this.validId(id) || isNaN(id)) {
      throw new BadRequestException();
    }
    const record: T = await this.repository.findOne(id, {
      where: { deletedAt: null },
    });
    if (!record) {
      throw new NotFoundException(`The record with id (${id}) was not found.`);
    }
    return record;
  }

  public async findAll(): Promise<T[]> {
    try {
      const entities: T[] = await this.repository.find({
        where: { deletedAt: null },
      });
      entities.map(item => this.preResultHook(item));
      return entities;
    } catch (error) {
      throw new InternalException();
    }
  }

  public async findOneById(id: number): Promise<T> {
    try {
      const record: T = await this.getRecordById(id);
      this.preResultHook(record);
      return record;
    } catch (error) {
      if (error && error instanceof HttpException) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async delete(id: number): Promise<T> {
    try {
      const record: T = await this.getRecordById(id);
      // Execute the hook
      this.preDeleteHook(record);
      await this.repository.delete(id);
      this.preResultHook(record);
      return record;
    } catch (error) {
      if (error && error instanceof HttpException) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async deleteSoft(id: number): Promise<T> {
    try {
      const record: T = await this.getRecordById(id);
      // Execute the hook
      this.preDeleteHook(record);
      await this.repository.save(record);
      this.preResultHook(record);
      return record;
    } catch (error) {
      if (error && error instanceof HttpException) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async save(entity: T): Promise<T> {
    try {
      // Check if the entity is valid
      // await this.isValid(entity);
      // Execute the hook
      this.preSaveHook(entity);
      // Save the entity to the database
      const savedEntity: T = await this.repository.save(entity);
      this.preResultHook(savedEntity);
      return savedEntity;
    } catch (error) {
      throw new InternalException();
    }
  }

  public async update(id: number, entity: T): Promise<T> {
    try {
      if (entity && (entity as any).id !== id) {
        throw new BadRequestException();
      }
      await this.getRecordById(id);
      // Execute the hook
      this.preUpdateHook(entity);
      // Update the entity in the database
      const updatedEntity: T = await this.repository.save(entity);
      this.preResultHook(updatedEntity);
      return updatedEntity;
    } catch (error) {
      if (error && error instanceof HttpException) {
        throw error;
      }
      throw new InternalException();
    }
  }
}
