

import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";

@Entity('request_location')
export class RequestLocationEntity {

    @PrimaryGeneratedColumn({name: 'location_id'})
    id: number;

    @ManyToOne(() => RequestEntity, (request) => request.locations)
    @JoinColumn({ name: 'fk_request' })
    request: RequestEntity;

    @Column({name:"url_google_map",nullable:false, type:"varchar"})
    urlGoogleMap: string;

    @Column({name:"latitude",nullable:true, type:"varchar"})
    latitude: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    longitude: string;


    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}