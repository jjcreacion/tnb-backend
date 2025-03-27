import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";

@Entity('services')
export class ServiceEntity {


    @PrimaryGeneratedColumn({name: 'pk_service'})
    pkService: number;

    @OneToOne(() => CategoryEntity, (category) => category.service)
    @JoinColumn({ name: 'fk_category' })
    category: CategoryEntity;

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
