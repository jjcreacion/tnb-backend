import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "@/category/entities/category.entity";
import {CountryEntity} from "@/country/entities/country.entity";
import {LocalityEntity} from "@/locality/entities/locality.entity";


@Entity('country_states')
export class CountryStateEntity {

    @PrimaryGeneratedColumn({name: 'pk_state'})
    pkState: number;

    @ManyToOne(() => CountryEntity, (country) => country.states)
    @JoinColumn({ name: 'fk_country' })
    country: CountryEntity;

    @OneToMany(() => LocalityEntity, (locality) => locality.state)
    localities: LocalityEntity | LocalityEntity[];

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({name:"internal_code",nullable:false, type:"varchar"})
    internalCode: string;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;


}
