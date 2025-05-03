import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { UserEntity } from '@/user/entities/user.entity'; 
  
  @Entity('mobile_service_requests')
  export class RequestEntity {
    @PrimaryGeneratedColumn({ name: 'request_id' })
    requestId: number;
  
    @ManyToOne(() => UserEntity, (user) => user.pkUser)
    @JoinColumn({ name: 'fk_user' })
    fkUser: UserEntity;
  
    @Column({ name: 'service_type', type: 'decimal', precision: 10, scale: 7 })
    serviceType: number;
  
    @Column({ name: 'service_description', type: 'text', nullable: true })
    serviceDescription: string;
  
    @Column({ name: 'address', type: 'varchar', length: 255 })
    address: string;
  
    @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 7 })
    latitude: number;
  
    @Column({ name: 'longitude', type: 'decimal', precision: 10, scale: 7 })
    longitude: number;
  
    @Column({ name: 'status', type: 'decimal', precision: 10, scale: 7 })
    status: number;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  }