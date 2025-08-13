import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubCategoryEntity} from "@/sub-category/entity/sub-category.entity";

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn({name: 'pk_category'})
    pkCategory: number;

    @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
    subCategory: SubCategoryEntity | SubCategoryEntity[];

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;

    @Column({ name: 'imagePath', nullable: true, type: 'varchar' })
    imagePath: string;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;
}
