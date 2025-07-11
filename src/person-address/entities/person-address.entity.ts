import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PersonEntity} from "@/person/entities/person.entity";

@Entity('person_address')
export class PersonAddressEntity {
    @PrimaryGeneratedColumn({name: 'pk_address'})
    pkAddress: number;

    @ManyToOne(() => PersonEntity, (person) => person.addresses)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    @Column({name:"address",nullable:false, type:"varchar"})
    address: string;

    @Column({name:"is_primary",default: 0})
    isPrimary: number;

    @Column({default: 1})
    status: number;

    @Column({name:"latitude", type:"decimal"})
    latitude: number;

    @Column({name:"longitude", type:"decimal"})
    longitude: number;

    @Column({name:"country", type:"int"})
    country: number;

    @Column({name:"state", type:"int"})
    state: number;

    @Column({name:"city", type:"int"})
    city: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;


}