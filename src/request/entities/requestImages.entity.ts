

import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RequestEntity} from "@/request/entities/request.entity";

@Entity('request_images')
export class RequestImageEntity {

    @PrimaryGeneratedColumn({name: 'image_id'})
    id: number;

    @OneToOne(() => RequestEntity, (request) => request.images)
    @JoinColumn({ name: 'fk_request' })
    request: RequestEntity;

    @Column({name:"url_image",nullable:true, type:"varchar"})
    urlImage: string;


    @Column({default: 1})
    status: number;

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

}