import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RequestEntity } from '../../app-mobile/service-requests/entities/service-request.entity'; // Ajusta la ruta

@Entity('request_images')
export class RequestImageEntity {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  imageId: number;

  @Column({ name: 'fk_request' })
  fkRequestId: number; // Columna para almacenar el ID de la solicitud

  @ManyToOne(() => RequestEntity, request => request.images) // Relación Many-to-One
  @JoinColumn({ name: 'fk_request' }) // Clave foránea real
  fkRequest: RequestEntity; // Propiedad para la relación

  @Column({ name: 'url_image' })
  urlImage: string;

  @Column()
  status: number;

  @Column({ name: 'createdAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}