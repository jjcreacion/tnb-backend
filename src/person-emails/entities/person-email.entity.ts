import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PersonEntity} from "@/person/entities/person.entity";


@Entity('person_emails')
export class PersonEmailEntity {
    @PrimaryGeneratedColumn({name: 'pk_email'})
    pkEmail: number;

    @ManyToOne(() => PersonEntity, (person) => person.emails)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    @Column({name:"email",nullable:false, type:"varchar"})
    email: string;

    @Column({name:"is_primary",default: 0})
    isPrimary: number;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}
