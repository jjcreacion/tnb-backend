import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "@/contact/entities/contact.entity";
import {UserEntity} from "@/user/entities/user.entity";

@Entity('person_notes')
export class PersonNoteEntity {
    @PrimaryGeneratedColumn({name: 'pk_note'})
    pkNote: number;

    @ManyToOne(() => ContactEntity)
    @JoinColumn({ name: 'fk_contact' })
    contact: ContactEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'fk_user' })
    user: UserEntity;

    @Column({name:"note", nullable: true, type:"varchar", length: 1024})
    note: string;

    @Column({name:"is_priority", default: 0})
    isPriority: number;

    @Column({ name:'created_at', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updated_at', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;
}