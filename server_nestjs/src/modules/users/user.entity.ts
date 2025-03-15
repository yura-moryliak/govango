import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CarEntity } from '../cars/car.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ default: false, nullable: false })
  isCarOwner: boolean = false;

  @Column({ default: '', nullable: false })
  firstName: string;

  @Column({ default: '', nullable: false })
  lastName: string;

  @Column({ default: '', nullable: false })
  city: string;

  @Column({ default: '', nullable: false })
  phoneNumber: string;

  @Column({ default: '', nullable: false })
  email: string;

  @Exclude()
  @Column({ default: '', nullable: false })
  password: string;

  @Column({ default: 0, nullable: false })
  likes: number;

  @OneToMany(() => CarEntity, (car: CarEntity) => car.user)
  cars: CarEntity[];
}
