import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import { CategoryEntity } from "@/category/entities/category.entity";
import {ServicesTypeEntity} from "@/services-type/entity/services-type.entity";
import {ClientTypeEntity} from "@/client-type/entities/clientType.entity";
import { RequestEntity } from '@/app-mobile/service-requests/entities/service-request.entity';

@Entity('sub_category')
export class SubCategoryEntity {

    @PrimaryGeneratedColumn({name: 'pk_sub_category'})
    pkSubCategory: number;

    @ManyToOne(() => CategoryEntity, (category) => category.subCategory)
    @JoinColumn({ name: 'fk_category' })
    category: CategoryEntity;

    @OneToMany(() => AddonsEntity, (serviceAddons) => serviceAddons.subCategory)
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

    @Column({ name: "price_from", type: "decimal", precision: 10, scale: 2, nullable: true })
    priceFrom: number;

    @Column({ name: "price_to", type: "decimal", precision: 10, scale: 2, nullable: true })
    priceTo: number;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @OneToMany(() => RequestEntity, (request) => request.fkSubCategory)
    serviceRequests: RequestEntity[];

}
