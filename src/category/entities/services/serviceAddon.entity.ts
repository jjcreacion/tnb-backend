import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {ServicesTypeEntity} from "@/category/entities/services/servicesType.entity";
import {ClientTypeEntity} from "@/clientType/entities/clientType.entity";


@Entity('services_addons')
export class ServiceAddonEntity {

    @PrimaryGeneratedColumn({name: 'pk_service_addon'})
    pkAddon: number;


    @Column({default: 1, name:"is_retail"})
    isRetail: number;


    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;

    @Column({name:"content_web",nullable:true, type:"varchar"})
    contentWeb: string;

    @Column({name:"price",nullable:true, type:"varchar"})
    price: number;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @ManyToOne(() => CategoryServicesEntity, (service) => service.addons)
    @JoinColumn({ name: 'fk_service' })
    service: CategoryServicesEntity;


    @OneToOne(() => ServicesTypeEntity, (serviceType) => serviceType.addons)
    @JoinColumn({ name: 'fk_service_type' })
    serviceType: ServicesTypeEntity;

    @OneToOne(() => ClientTypeEntity, (clientType) => clientType.addons)
    @JoinColumn({ name: 'fk_client_type' })
    clientType: ClientTypeEntity;
}
