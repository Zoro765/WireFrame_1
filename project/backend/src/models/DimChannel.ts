import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'dim_channel' })
export class DimChannel {
  @PrimaryGeneratedColumn()
  channel_key!: number;

  // From your 'Channel_Retailer' column
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  channel_retailer_name!: string;
}