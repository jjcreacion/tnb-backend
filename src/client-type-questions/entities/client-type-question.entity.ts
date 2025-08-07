import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientTypeEntity } from '@/client-type/entities/clientType.entity';

@Entity('client_type_questions')
export class QuestionEnTity {

  @PrimaryGeneratedColumn({name: 'pk_question'})
  pkQuestion: number;

  @Column({name:"name", nullable:false})
  name: string;

  @Column({name:"description", nullable:true})
  description: string;

  @ManyToOne(() => ClientTypeEntity, (clientType) => clientType.questions)
  @JoinColumn({ name: 'fk_client_type' })
  clientType: ClientTypeEntity


  @Column({default: 1})
  status: number;

  @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
  createdAt : Date;

  @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
  updatedAt : Date;

}