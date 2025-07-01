import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn} from 'typeorm';
import {PersonEntity} from "@/person/entities/person.entity";
import {ProfileEntity} from "@/profile/entities/profile.entity";
import {RequestEntity} from "@/app-mobile/service-requests/entities/service-request.entity"; // AGREGAR IMPORT

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn({name: 'pk_user'})
    pkUser: number;

    @OneToOne(() => PersonEntity, (person) => person.user)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    // CORREGIR: Cambiar @JoinColumn para que sea la relacion inversa correcta
    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    // @JoinColumn({ name: 'fk_profile' })
    profile: ProfileEntity;

    @Column({name:"email",nullable:false})
    email: string;

    @Column({name:"username",nullable:false, unique:true})
    username: string;

    @Column({name:"password",nullable:false})
    password: string;

    @Column({name:"phone",nullable:false})
    phone: string;

    @Column({name:"validate_email", default:0})
    validateEmail: number;

    @Column({name:"validate_phone", default:0})
    validatePhone: number;

    @Column({default: 1})
    status: number;

    @Column({name:"img_profile"})
    img_profile: string;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    // relación con mobile service requests
    @OneToMany(() => RequestEntity, (request) => request.fkUser)
    serviceRequests: RequestEntity[];
}
