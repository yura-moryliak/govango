import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarEntity } from './car.entity';

@Entity()
export class CarImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => CarEntity, (car: CarEntity) => car.images)
  car: CarEntity;
}
