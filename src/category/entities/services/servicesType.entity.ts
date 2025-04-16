import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";


@Entity('services_type')
export class ServicesTypeEntity {

    @PrimaryGeneratedColumn({name: 'pk_services_type'})
    pkType: number;

    @OneToMany(() => ServiceAddonEntity, (serviceAddons) => serviceAddons.serviceType)
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
