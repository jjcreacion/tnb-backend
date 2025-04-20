import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import {SubCategoryEntity} from "@/sub-category/entity/subCategory.entity";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";

@Entity('services')
export class ServicesEntity {


    @PrimaryGeneratedColumn({name: 'pk_service'})
    pkService: number;

    @OneToOne(() => SubCategoryEntity, (subcategory) => subcategory.services)
    @JoinColumn({ name: 'fk_sub_category' })
    subCategory: SubCategoryEntity;

    @OneToMany(() => AddonsEntity, (serviceAddons) => serviceAddons.service)
    addons: AddonsEntity | AddonsEntity[];

    @OneToOne(() => ServicesTypeEntity, (serviceType) => serviceType.services)
    @JoinColumn({ name: 'fk_service_type' })
    serviceType: ServicesTypeEntity;

    @OneToOne(() => ClientTypeEntity, (clientType) => clientType.service)
    @JoinColumn({ name: 'fk_client_type' })
    clientType: ClientTypeEntity;

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
