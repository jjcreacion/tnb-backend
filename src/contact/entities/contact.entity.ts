import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { PersonEntity } from "@/person/entities/person.entity";

@Entity('contact')
export class ContactEntity {
    @PrimaryGeneratedColumn({name: 'pk_contact'})
    pkContact: number;

    @ManyToOne(() => PersonEntity, (person) => person.addresses)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    @Column({name:"is_commercial",default: 0})
    isCommercial: number;

    @Column({name:"entry",default: 0})
    entry: number;

    @Column({default: 1})
    status: number;

    @Column({ name:'created_at', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updated_at', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}