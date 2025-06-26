import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RequestEntity } from '../../app-mobile/service-requests/entities/service-request.entity'; // Ajusta la ruta

@Entity('request_images')
export class RequestImageEntity {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  imageId: number;

  @Column({ name: 'fk_request' })
  fkRequestId: number; 

  @ManyToOne(() => RequestEntity, request => request.images) 
  @JoinColumn({ name: 'fk_request' }) 
  fkRequest: RequestEntity; 

  @Column({ name: 'url_image' })
  urlImage: string;

  @Column()
  status: number;

  @Column({ name: 'createdAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}