import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'hero' })
export default class Hero {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ name: 'name', length: 500 })
  public name: string;

  @Column({ name: 'identity', length: 500 })
  public identity: string;

  @Column({ name: 'hometown', length: 500 })
  public hometown: string;

  @Column({ name: 'age' })
  public age: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updatedAt?: Date;

  @Column({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp with time zone',
  })
  public deletedAt?: Date;
}
