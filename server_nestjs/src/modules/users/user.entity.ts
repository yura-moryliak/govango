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
  'isCarOwner',
  'firstName',
  'lastName',
  'city',
  'phoneNumber',
  'email',
  'likes',
  'avatar',
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

  // Do not select
  @Column({ default: '', nullable: false })
  password: string;

  @Column({ default: 0, nullable: false })
  likes: number;

  // Do not select
  @Column({ default: '', nullable: false, unique: true })
  googleId: string;

  @Column({ default: '', nullable: false })
  avatar: string;

  // Do not select
  @Column({ default: '', nullable: false })
  avatarSource: string;

  // Do not select
  @Column({ default: '', nullable: true })
  passwordResetToken: string;

  // Do not select
  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @OneToMany(() => CarEntity, (car: CarEntity) => car.user)
  cars: CarEntity[];

  @OneToMany(() => UserDeviceEntity, (device: UserDeviceEntity) => device.user)
  devices: UserDeviceEntity[];
}
