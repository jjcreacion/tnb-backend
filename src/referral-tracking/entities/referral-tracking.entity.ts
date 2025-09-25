
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('referral_tracking')
  export class ReferralTrackingEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
  
    @Column({ name: 'referral_code', type: 'varchar', nullable: false })
    referralCode: string;
  
    @Column({ name: 'is_claimed', type: 'boolean', default: false })
    isClaimed: boolean;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  }