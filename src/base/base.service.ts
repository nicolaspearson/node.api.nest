import { HttpException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

import {
  BadRequestException,
  InternalException,
  NotFoundException,
} from '@app/exceptions';

export default abstract class BaseService<T extends DeepPartial<T>> {
  constructor(private repository: Repository<T>) {}

  public preSaveHook(entity: T): void {
    // Executed before the save repository call
  }

  public preUpdateHook(entity: T): void {
    // Executed before the update repository call
  }

  public preDeleteHook(entity: T): void {
    // Executed before the delete repository call
  }

  public preResultHook(entity: T): void {
    // Executed before the result is returned
  }

  public validId(id: number): boolean {
    return id !== undefined && id > 0;
  }

  public async findAll(): Promise<T[]> {
    try {
      const entities: T[] = await this.repository.find();
      entities.map(item => this.preResultHook(item));
      return entities;
    } catch (error) {
      if (error && error.isBoom) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async findOneById(id: number): Promise<T> {
    try {
      if (!this.validId(id) || isNaN(id)) {
        throw new BadRequestException();
      }
      const entity: T = await this.repository.findOne(id);
      this.preResultHook(entity);
      return entity;
    } catch (error) {
      if (error && error.isBoom) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async delete(id: number): Promise<T> {
    try {
      if (!this.validId(id)) {
        throw new BadRequestException();
      }
      const record = await this.findOneById(id);
      if (!record) {
        throw new NotFoundException(
          `The requested record was not found: ${id}`,
        );
      }
      // Execute the hook
      this.preDeleteHook(record);
      await this.repository.delete(id);
      this.preResultHook(record);
      return record;
    } catch (error) {
      if (error && error.isBoom) {
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
      if (error && (error.isBoom || error instanceof HttpException)) {
        throw error;
      }
      throw new InternalException();
    }
  }

  public async update(id: number, entity: T): Promise<T> {
    try {
      // Check if the entity is valid
      if (!this.validId(id)) {
        throw new BadRequestException();
      }
      const record = await this.findOneById(id);
      if (!record) {
        throw new NotFoundException(
          `The requested record was not found: ${id}`,
        );
      }
      // Execute the hook
      this.preUpdateHook(entity);
      // Update the entity on the database
      const updatedEntity: T = await this.repository.save(record);
      this.preResultHook(updatedEntity);
      return updatedEntity;
    } catch (error) {
      if (error && error.isBoom) {
        throw error;
      }
      throw new InternalException();
    }
  }
}
