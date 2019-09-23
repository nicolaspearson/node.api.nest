import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import User from '@app/entities/user.entity';
import { UserSeeds } from '@app/seeds/user.seed';

export class SeedUsers1569059275758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getRepository(User).save(UserSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // do nothing
  }
}
