import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";
import {RequestImageEntity} from "@/request/entities/requestImages.entity";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";

@Entity('services')
export class CategoryServicesEntity {


    @PrimaryGeneratedColumn({name: 'pk_service'})
    pkService: number;

    @OneToOne(() => CategoryEntity, (category) => category.service)
    @JoinColumn({ name: 'fk_category' })
    category: CategoryEntity;

    @OneToMany(() => ServiceAddonEntity, (serviceAddons) => serviceAddons.service)
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
