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
  
    @ManyToOne(() => UserEntity, (user) => user.serviceRequests)
    @JoinColumn({ name: 'fk_user' })
    fkUser: UserEntity;
  
    // CORREGIDO: de decimal a int
    @Column({ name: 'service_type', type: 'int' })
    serviceType: number;
  
    @Column({ name: 'service_description', type: 'text', nullable: true })
    serviceDescription: string;
  
    @Column({ name: 'address', type: 'varchar', length: 255 })
    address: string;
  
    // CORREGIDO: precision 10,6 (coincide con BD)
    @Column({ name: 'latitude', type: 'decimal', precision: 10, scale: 6 })
    latitude: number;
  
    // CORREGIDO: precision 10,6 (coincide con BD)  
    @Column({ name: 'longitude', type: 'decimal', precision: 10, scale: 6 })
    longitude: number;
  
    // CORREGIDO: de decimal a int
    @Column({ name: 'status', type: 'int' })
    status: number;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
  }