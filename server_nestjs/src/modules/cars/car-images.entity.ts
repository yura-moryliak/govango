import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarEntity } from './car.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class CarImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => CarEntity, (car: CarEntity) => car.images, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  car: CarEntity;
}
