import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";
import {AddonsEntity} from "@/service-addons/entity/addons.entity";
import {ServicesEntity} from "@/services/entity/services.entity";

@Entity('sub_category')
export class SubCategoryEntity {


    @PrimaryGeneratedColumn({name: 'pk_sub_category'})
    pkSubCategory: number;

    @ManyToOne(() => CategoryEntity, (category) => category.subCategory)
    @JoinColumn({ name: 'fk_category' })
    category: CategoryEntity;


    @OneToMany(() => ServicesEntity, (service) => service.subCategory)
    services: ServicesEntity | ServicesEntity[];

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