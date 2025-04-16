import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SubCategoryEntity} from "@/category/entities/subCategory.entity";
import {LocalityEntity} from "@/locality/entities/locality.entity";


@Entity('locality_type')
export class LocalityTypeEntity {

    @PrimaryGeneratedColumn({name: 'pk_type'})
    pkType: number;

    @OneToOne(() => LocalityEntity, (locality) => locality.localityType)
    locality: LocalityEntity;

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
