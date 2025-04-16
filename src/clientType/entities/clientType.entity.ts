import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";


@Entity('client_type')
export class ClientTypeEntity {

    @PrimaryGeneratedColumn({name: 'pk_client_type'})
    pkType: number;

    @OneToMany(() => ServiceAddonEntity, (serviceAddons) => serviceAddons.clientType)
    addons: ServiceAddonEntity | ServiceAddonEntity[];

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
