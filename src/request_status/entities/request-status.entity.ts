import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';
  import { StatusListEntity } from '@/status_list/entities/status-list.entity';
  import { UserEntity } from '@/user/entities/user.entity';
  
  @Entity('request_status')
  export class RequestStatusEntity {
    @PrimaryGeneratedColumn({ name: 'req_status_id' })
    reqStatusId: number;
  
    @ManyToOne(() => StatusListEntity)
    @JoinColumn({ name: 'previous_status_id' })
    previousStatus: StatusListEntity;
  
    @ManyToOne(() => StatusListEntity)
    @JoinColumn({ name: 'new_status_id' })
    newStatus: StatusListEntity;
  
    @CreateDateColumn({ name: 'change_date', type: 'datetime' })
    changeDate: Date;
  
    @Column({ type: 'text', nullable: true })
    observation?: string;

    @ManyToOne(() => RequestEntity, (request) => request.requestStatus)
    @JoinColumn({ name: 'fk_service_request' })
    request: RequestEntity;
  
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'fk_user' })
    user: UserEntity;
  }
  
  