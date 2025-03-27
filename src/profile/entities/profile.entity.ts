import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "@/user/entities/user.entity";


@Entity('profile')
export class ProfileEntity {

    @PrimaryGeneratedColumn({name: 'pk_profile'})
    pkProfile: number;

    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({ name: 'fk_user' })
    user: UserEntity;

    /*// Modificar cuando se cree la información de locality
    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({ name: 'fk_locality' })
    locality: UserEntity;*/

    /*// Modificar cuando se cree la información de Industry (maestros)
    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({ name: 'fk_industry' })
    industry: UserEntity;*/

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"alias",nullable:true, type:"varchar"})
    alias: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;

    @Column({name:"phone",nullable:true, type:"varchar"})
    phone: string;

    @Column({name:"phone_extension",nullable:true, type:"varchar"})
    phoneExtension: string;

    @Column({name:"address",nullable:true, type:"varchar"})
    address: string;

    @Column({name:"code_zip",nullable:true, type:"number"})
    zipCode: number;

    @Column({name:"industry",nullable:true, type:"varchar"})
    industry: string;

    @Column({name:"source",nullable:true, type:"varchar"})
    source: string;

    @Column({name:"url_profile_image",nullable:true, type:"varchar"})
    urlProfileImage: string;

    @Column({name:"url_banner_image",nullable:true, type:"varchar"})
    urlBannerImage: string;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;


}
