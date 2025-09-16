import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('app_settings')
export class AppSettingsEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  key: string;

  @Column({ type: 'text' })
  value: string;
}

