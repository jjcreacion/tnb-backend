import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";


@Entity('country_city')
export class LocalityEntity {

    @PrimaryGeneratedColumn({name: 'pk_city'})
    pkCity: number;

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @ManyToOne(() => CountryStateEntity, (state) => state.localities)
    @JoinColumn({ name: 'fk_state' })
    state: CountryStateEntity;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;
}
