import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ServiceEntity} from "@/service/entities/service.entity";

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn({name: 'pk_category'})
    pkCategory: number;

    @OneToOne(() => ServiceEntity, (service) => service.category)
    service: ServiceEntity;

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
