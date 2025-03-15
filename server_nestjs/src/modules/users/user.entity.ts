import {
  BaseEntity,
  Column,
  Entity,
  FindOptionsSelect,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarEntity } from '../cars/car.entity';
import { UserDeviceEntity } from '../user-devices/user-device.entity';

export const USER_ENTITY_PASSWORD_LESS_SELECT = [
  'id',
  'firstName',
  'lastName',
  'city',
  'phoneNumber',
  'email',
  'likes',
] as FindOptionsSelect<UserEntity>;
export const USER_ENTITY_WITH_REFRESH_TOKEN_SELECT = [
  'id',
  'firstName',
  'lastName',
  'city',
  'phoneNumber',
  'email',
  'likes',
  'refreshToken',
] as FindOptionsSelect<UserEntity>;

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

  @Column({ default: '', nullable: false })
  password: string;

  @Column({ default: 0, nullable: false })
  likes: number;

  @OneToMany(() => CarEntity, (car: CarEntity) => car.user)
  cars: CarEntity[];

  @OneToMany(() => UserDeviceEntity, (device: UserDeviceEntity) => device.user)
  devices: UserDeviceEntity[];
}
