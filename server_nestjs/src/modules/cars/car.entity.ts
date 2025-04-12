import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CarImagesEntity } from './car-images.entity';

@Entity()
export class CarEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ default: '', nullable: false })
  registrationPlate: string;

  @Column({ default: '', nullable: false })
  make: string;

  @Column({ default: '', nullable: false })
  model: string;

  @Column({
    default: 0.0,
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 1,
  })
  length: number;

  @Column({
    default: 0.0,
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 1,
  })
  width: number;

  @Column({
    default: 0.0,
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 1,
  })
  height: number;

  @Column({
    default: 0.0,
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 1,
  })
  carryCapacity: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.cars)
  user: UserEntity;

  @OneToMany(() => CarImagesEntity, (image: CarImagesEntity) => image.car)
  images: CarImagesEntity[];
}
