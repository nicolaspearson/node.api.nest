import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  InternalException,
  NotFoundException,
} from '@app/exceptions';

import Hero from '@app/entities/hero.entity';
import { HeroService } from '@app/hero/hero.service';

import { repositoryMockFactory } from '../utils/test-mocks';
import { MockType } from '../utils/test-types';

import { heroOne, heroTwo } from '../utils/fixtures';

describe('HeroService', () => {
  let service: HeroService;
  let repositoryMock: MockType<Repository<Hero>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        {
          provide: getRepositoryToken(Hero),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<HeroService>(HeroService);
    repositoryMock = module.get(getRepositoryToken(Hero));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hooks', () => {
    it('preSaveHook should mutate hero', () => {
      const saveHero = { ...heroOne };
      expect(service.preSaveHook(saveHero));
      expect(saveHero).not.toEqual(heroOne);
    });

    it('preUpdateHook should mutate hero', () => {
      const updateHero = { ...heroOne };
      expect(service.preUpdateHook(updateHero));
      expect(updateHero).not.toEqual(heroOne);
    });

    it('preDeleteHook should mutate hero', () => {
      const deleteHero = { ...heroOne };
      expect(service.preDeleteHook(deleteHero));
      expect(deleteHero).not.toEqual(heroOne);
    });

    it('preResultHook should mutate hero', () => {
      const resultHero = { ...heroOne };
      expect(service.preResultHook(resultHero));
      expect(resultHero).not.toEqual(heroOne);
    });
  });

  describe('findAll', () => {
    it('should throw if database error', async () => {
      repositoryMock.find.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.findAll()).rejects.toThrowError(InternalException);
    });

    it('should return successfully for findAll', async () => {
      repositoryMock.find.mockReturnValue([heroOne]);
      expect(await service.findAll()).toEqual([heroOne]);
    });
  });

  describe('findOneById', () => {
    it('should throw if database error', async () => {
      repositoryMock.findOne.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.findOneById(heroOne.id)).rejects.toThrowError(
        InternalException,
      );
    });

    it('should throw BadRequestException if id is not valid', async () => {
      await expect(service.findOneById(undefined)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if record does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      await expect(service.findOneById(heroOne.id)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return successfully for findOneById', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      expect(await service.findOneById(1)).toEqual(heroOne);
    });
  });

  describe('delete', () => {
    it('should throw if database error', async () => {
      repositoryMock.findOne.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.delete(heroOne.id)).rejects.toThrowError(
        InternalException,
      );
    });

    it('should throw BadRequestException if id is not valid', async () => {
      await expect(service.delete(undefined)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if record does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      await expect(service.delete(heroOne.id)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return successfully for delete', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      expect(await service.delete(heroOne.id)).toEqual(heroOne);
    });
  });

  describe('deleteSoft', () => {
    it('should throw if database error', async () => {
      repositoryMock.findOne.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.deleteSoft(heroOne.id)).rejects.toThrowError(
        InternalException,
      );
    });

    it('should throw BadRequestException if id is not valid', async () => {
      await expect(service.deleteSoft(undefined)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if record does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      await expect(service.deleteSoft(heroOne.id)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return successfully for deleteSoft', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      expect(await service.deleteSoft(heroOne.id)).toEqual(heroOne);
    });
  });

  describe('save', () => {
    it('should throw if database error', async () => {
      repositoryMock.save.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.save(heroOne)).rejects.toThrowError(
        InternalException,
      );
    });

    it('should return successfully for save', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      expect(await service.save(heroOne)).toEqual(heroOne);
    });
  });

  describe('update', () => {
    it('should throw if database error', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      repositoryMock.save.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(service.update(heroOne.id, heroOne)).rejects.toThrowError(
        InternalException,
      );
    });

    it('should throw BadRequestException if id is not valid', async () => {
      await expect(service.update(heroOne.id, heroTwo)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if record does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      await expect(service.update(heroOne.id, heroOne)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return successfully for update', async () => {
      repositoryMock.findOne.mockReturnValue(heroOne);
      expect(await service.update(heroTwo.id, heroTwo)).toEqual(heroTwo);
    });
  });
});
