import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RequestEntity } from './service-request.entity'; 

@Entity('status_list')
export class StatusListEntity {
  @PrimaryGeneratedColumn({ name: 'status_id' })
  statusId: number;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string; 

  @Column({ name: 'order', type: 'int', nullable: true })
  order: number;

  @Column({ name: 'status', type: 'int', nullable: true })
  status: number;

  @Column({ name: 'color', type: 'varchar', length: 100, nullable: true })
  color: string;

  @OneToMany(() => RequestEntity, (request) => request.fkStatus)
  serviceRequests: RequestEntity[];
}