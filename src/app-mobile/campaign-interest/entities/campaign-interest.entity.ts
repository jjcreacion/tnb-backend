
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { campaignEntity } from '../../campaigns/entities/campaigns.entity'; 
  import { UserEntity } from '../../../user/entities/user.entity';

  
  @Entity('campaign_interests') 
  export class CampaignInterestEntity {
    @PrimaryGeneratedColumn() 
    pk_interests: number;
  
    @Column({ name: 'campaign_id', type: 'int', nullable: false })
    campaignId: number;
  
    @ManyToOne(() => campaignEntity, (campaign) => campaign.campaignsId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'campaign_id', referencedColumnName: 'campaignsId' }) 
    campaign: campaignEntity;
  
    @Column({ name: 'user_id', type: 'int', nullable: true }) 
    fkUserId: number; 
  
    @ManyToOne(() => UserEntity, (user) => user.pkUser, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'pkUser' }) 
    user: UserEntity; 
  
  
    @CreateDateColumn({ type: 'datetime', name: 'expressed_at' }) 
    expressedAt: Date;
  
    @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
    ipAddress: string;
  
    @Column({ name: 'user_agent', type: 'text', nullable: true })
    userAgent: string;
  }