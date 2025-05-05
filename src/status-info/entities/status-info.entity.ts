import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('status_info')
export class StatusInfoEntity {


    @PrimaryGeneratedColumn({name: 'pk_status'})
    pkStatus: number;

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;

    @Column({name:"is_enabled",default: 1})
    isEnabled: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;



}