import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LocalityTypeEntity} from "@/locality-type/entities/localityType.entity";
import {CountryStateEntity} from "@/country-states/entities/country-states.entity";


@Entity('localities')
export class LocalityEntity {

    @PrimaryGeneratedColumn({name: 'pk_locality'})
    pkLocality: number;

    @Column({name:"name",nullable:false, type:"varchar"})
    name: string;

    @ManyToOne(() => CountryStateEntity, (state) => state.localities)
    @JoinColumn({ name: 'fk_state' })
    state: CountryStateEntity;

    @OneToOne(() => LocalityTypeEntity, (type) => type.locality)
    @JoinColumn({ name: 'fk_locality_type' })
    localityType: LocalityTypeEntity;

    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}
