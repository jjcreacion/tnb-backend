import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryServicesEntity} from "@/category/entities/services/categoryServices.entity";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn({name: 'pk_category'})
    pkCategory: number;


    @OneToOne(() => SubCategoryEntity, (subCategory) => subCategory.category)
    subCategory: SubCategoryEntity;

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
