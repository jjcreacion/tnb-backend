import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "@/user/entities/user.entity";
import {RequestEntity} from "@/request/entities/request.entity";
import {PersonEmailEntity} from "@/person-emails/entities/person-email.entity";
import {PersonPhoneEntity} from "@/person-phones/entities/person-phone.entity";
import {PersonAddressEntity} from "@/person-address/entities/person-address.entity";
//
@Entity('person')
export class PersonEntity {

    @PrimaryGeneratedColumn({name: 'pk_person'})
    pkPerson: number;

    @Column({name:"first_name",nullable:false})
    firstName: string;

    @Column({name:"middle_name",nullable:true})
    middleName: string;

    @Column({name:"last_name",nullable:false})
    lastName: string;

    @Column({name:"date_of_birth",nullable:false, type: "date"})
    dateOfBirth: Date;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @OneToOne(() => UserEntity, (user) => user.person)
    user: UserEntity;

    @OneToMany(() => RequestEntity, (request) => request.person)
    requests: RequestEntity[];

    @OneToMany(() => PersonEmailEntity, (email) => email.person)
    emails : PersonEmailEntity[]

    @OneToMany(() => PersonPhoneEntity, (phone) => phone.person)
    phones : PersonPhoneEntity[]

    @OneToMany(() => PersonAddressEntity, (address) => address.person)
    addresses : PersonAddressEntity[]

}
