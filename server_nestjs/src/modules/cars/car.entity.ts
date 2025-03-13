import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class CarEntity extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.cars)
  user: UserEntity;

  @Column({ default: '', nullable: false })
  registrationPlate: string;

  @Column({ default: '', nullable: false })
  make: string;

  @Column({ default: '', nullable: false })
  model: string;

  @Column({ default: 0.0, nullable: false, type: "decimal", precision: 10, scale: 1 })
  length: number;

  @Column({ default: 0.0, nullable: false, type: "decimal", precision: 10, scale: 1 })
  weight: number;

  @Column({ default: 0.0, nullable: false, type: "decimal", precision: 10, scale: 1 })
  height: number;

  @Column({ default: 0.0, nullable: false, type: "decimal", precision: 10, scale: 1 })
  carryCapacity: number;
}