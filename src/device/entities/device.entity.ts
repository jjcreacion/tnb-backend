import { UserEntity } from '@/user/entities/user.entity'; 
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('devices')
export class DeviceEntity {
    @PrimaryColumn({ name: 'pk_device', type: 'char', length: 36 })
    pkDevice: string;

    @ManyToOne(() => UserEntity, (user) => user.devices)
    @JoinColumn({ name: 'fk_user' })
    user: UserEntity;

    @Column({ name: 'fk_user', type: 'int', nullable: false }) 
    fkUser: number; 

    @Column({ name: 'expo_push_token', type: 'varchar', length: 255, unique: true })
    expoPushToken: string;

    @Column({ name: 'platform', type: 'varchar', length: 10 })
    platform: string;

    @Column({ name: 'notifications_enabled', default: true })
    notificationsEnabled: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}