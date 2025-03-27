

import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";

@Entity('request_priority')
export class RequestPriorityEntity {

    @PrimaryGeneratedColumn({name: 'priority_id'})
    id: number;

    @OneToOne(() => RequestEntity, (request) => request.priority)
    @JoinColumn({ name: 'fk_request' })
    request: RequestEntity;

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