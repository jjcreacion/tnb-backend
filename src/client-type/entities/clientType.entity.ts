import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ServicesEntity} from "@/services/entity/services.entity";
import { QuestionEnTity } from '@/client-type-questions/mapper/client-type-question.mapper';
import { SubCategoryEntity } from '@/sub-category/entity/subCategory.entity';


@Entity('client_type')
export class ClientTypeEntity {

    @PrimaryGeneratedColumn({name: 'pk_client_type'})
    pkType: number;

    @OneToMany(() => ServicesEntity, (service) => service.clientType)
    service: ServicesEntity | ServicesEntity[];

    @OneToMany(() => QuestionEnTity, (question) => question.clientType)
    questions : QuestionEnTity

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;



}
