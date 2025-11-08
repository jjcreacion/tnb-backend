import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('referral_history')
@Index(['referrerUserId']) 
@Index(['referredUserId'], { unique: true })
export class ReferralHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'pk_referral_history' })
  pkReferralHistory: number;

  @Column({ name: 'referrer_user_id' })
  referrerUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.referredHistoryAsReferrer, { onDelete: 'RESTRICT' }) 
  @JoinColumn({ name: 'referrer_user_id', referencedColumnName: 'pkUser' })
  referrerUser: UserEntity;

  @Column({ name: 'referred_user_id', unique: true })
  referredUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.referredHistoryAsReferred, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'referred_user_id', referencedColumnName: 'pkUser' })
  referredUser: UserEntity;
  
  @Column({ name: 'reward_amount', type: 'decimal', precision: 10, scale: 2 })
  rewardAmount: number;

  @Column({
    name: 'referred_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  referredAt: Date;
}