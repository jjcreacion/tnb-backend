import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CountryStateEntity} from "@/countryStates/entities/countryState.entity";


@Entity('countries')
export class CountryEntity {

    @PrimaryGeneratedColumn({name: 'pk_country'})
    pkCountry: number;

    @OneToMany(() => CountryStateEntity, (state) => state.country)
    states: CountryStateEntity | CountryStateEntity[];

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}
