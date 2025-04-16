import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";
import {ServiceAddonEntity} from "@/category/entities/services/serviceAddon.entity";

@Entity('sub_category')
export class SubCategoryEntity {


    @PrimaryGeneratedColumn({name: 'pk_sub_category'})
    pkSubCategory: number;

    @OneToOne(() => CategoryEntity, (category) => category.subCategory)
    @JoinColumn({ name: 'fk_category' })
    category: CategoryEntity;

    @OneToMany(() => ServiceAddonEntity, (serviceAddons) => serviceAddons.subCategory)
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