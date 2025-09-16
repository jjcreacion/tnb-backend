import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';
import { PersonEntity } from '@/person/entities/person.entity';
import { ProfileEntity } from '@/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'pk_user' })
  pkUser: number;

  @OneToOne(() => PersonEntity, (person) => person.user)
  @JoinColumn({ name: 'fk_person' })
  person: PersonEntity;

  // un User tiene un Profile
  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'validate_email', default: 0 })
  validateEmail: number;

  @Column({ name: 'validate_phone', default: 0 })
  validatePhone: number;

  @Column({ default: 1 })
  status: number;

  @Column({ name: 'img_profile' })
  img_profile: string;

  @Column({
    name: 'roles',
    type: 'set',
    enum: Role,
    default: [Role.CLIENT],
  })
  roles: Role[];

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'referral_code', type: 'varchar', nullable: true, unique: true })
  referralCode: string;

  @Column({ name: 'balance', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  balance: number;

  // Relación con mobile service requests
  @OneToMany(() => RequestEntity, (request) => request.fkUser)
  serviceRequests: RequestEntity[];
}
