import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RequestLocationEntity} from "@/request/entities/requestLocation.entity";
import {PersonEntity} from "@/person/entities/person.entity";
import {RequestImageEntity} from "@/request/entities/requestImages.entity";
import {RequestPriorityEntity} from "@/request/entities/requestPriority.entity";

@Entity('requests')
export class RequestEntity {

    @PrimaryGeneratedColumn({name: 'request_id'})
    id: number;

    @ManyToOne(() => PersonEntity, (person) => person.requests)
    @JoinColumn({ name: 'fk_person' })
    person: PersonEntity;

    @Column({ name:'date_request', type: "timestamp", })
    dateRequest : Date;

    @Column({name:"status",nullable:false, default:"Pending", type:"varchar"})
    status: string;

    @Column({name:"description",nullable:true, type:"varchar"})
    description: string;
2

    @Column({ name:'createdAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @Column({ name:'updatedAt', type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @OneToOne(() => RequestPriorityEntity, (priority) => priority.request)
    priority: RequestPriorityEntity;

    @OneToMany(() => RequestLocationEntity, (location) => location.request)
    locations: RequestLocationEntity | RequestLocationEntity[];

    @OneToMany(() => RequestImageEntity, (image) => image.request)
    images: RequestImageEntity | RequestImageEntity[];


}
