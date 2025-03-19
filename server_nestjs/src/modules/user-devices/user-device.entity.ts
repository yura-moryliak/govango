import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class UserDeviceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.devices, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ unique: true })
  fingerprint: string;

  @Column({ unique: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastActiveAt: Date;
}
