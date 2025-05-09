import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PersonEntity} from "@/person/entities/person.entity";

@Entity('person_phones')
export class PersonPhoneEntity {
    @PrimaryGeneratedColumn({name: 'pk_phone'})
    pkPhone: number;

    @ManyToOne(() => PersonEntity, (person) => person.phones)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    @Column({name:"phone",nullable:false, type:"varchar"})
    phone: string;

    @Column({name:"is_primary",default: 0})
    isPrimary: number;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;


}