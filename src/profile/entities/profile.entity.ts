import { UserEntity } from "@/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class ProfileEntity {

    @PrimaryGeneratedColumn({ name: 'pk_profile' })
    pkProfile: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'alias', nullable: true })
    alias: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'phone_extension', nullable: true })
    phoneExtension: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'code_zip', nullable: true })
    codeZip: number;

    // Alias para compatibilidad con DTOs existentes
    get zipCode(): number {
        return this.codeZip;
    }

    set zipCode(value: number) {
        this.codeZip = value;
    }

    @Column({ name: 'industry', nullable: true })
    industry: string;

    @Column({ name: 'source', nullable: true })
    source: string;

    @Column({ name: 'url_profile_image', nullable: true })
    urlProfileImage: string;

    @Column({ name: 'url_banner_image', nullable: true })
    urlBannerImage: string;

    @Column({ name: 'status', nullable: false, default: 1 })
    status: number;

    @Column({ 
        name: 'createdAt', 
        type: "timestamp", 
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP' 
    })
    createdAt: Date;

    @Column({ 
        name: 'updatedAt', 
        type: "timestamp", 
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    // Relación con User - AQUÍ va el @JoinColumn porque profile tiene la FK
    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({ name: 'fk_user' })
    user: UserEntity;

    // También puedes exponer la FK como propiedad si la necesitas
    @Column({ name: 'fk_user', nullable: true })
    fkUser: number;
}


    /*// TODO: Modificar cuando se cree la entidad de locality
    @OneToOne(() => LocalityEntity, (locality) => locality.profile)
    @JoinColumn({ name: 'fk_locality' })
    locality: LocalityEntity; */

    /*// TODO: Modificar cuando se cree la entidad de Industry (maestros)
    @OneToOne(() => IndustryEntity, (industry) => industry.profile)
    @JoinColumn({ name: 'fk_industry' })
    industry: IndustryEntity;*/
