import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';
import { DimDate } from './DimDate';
import { DimProduct } from './DimProduct';
import { DimRegion } from './DimRegion';
import { DimChannel } from './DimChannel';
import { DimManufacturer } from './DimManufacturer';

@Entity({ name: 'fact_sales' })
// A composite index on foreign keys is good for query performance and can ensure uniqueness of a grain
@Index(['date_key', 'product_key', 'region_key', 'channel_key', 'manufacturer_key'], { unique: true })
export class FactSales {
  @PrimaryGeneratedColumn()
  fact_sales_id!: number;

  @Column()
  @Index()
  date_key!: number; // FK to DimDate
  @ManyToOne(() => DimDate, { onDelete: 'RESTRICT', nullable: false }) // Cannot delete a date if sales facts refer to it
  @JoinColumn({ name: 'date_key', referencedColumnName: 'date_key' })
  dimDate!: DimDate;

  @Column()
  @Index()
  product_key!: number; // FK to DimProduct
  @ManyToOne(() => DimProduct, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'product_key', referencedColumnName: 'product_key' })
  dimProduct!: DimProduct;

  @Column()
  @Index()
  region_key!: number; // FK to DimRegion
  @ManyToOne(() => DimRegion, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'region_key', referencedColumnName: 'region_key' })
  dimRegion!: DimRegion;

  @Column()
  @Index()
  channel_key!: number; // FK to DimChannel
  @ManyToOne(() => DimChannel, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'channel_key', referencedColumnName: 'channel_key' })
  dimChannel!: DimChannel;

  @Column()
  @Index()
  manufacturer_key!: number; // FK to DimManufacturer
  @ManyToOne(() => DimManufacturer, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'manufacturer_key', referencedColumnName: 'manufacturer_key' })
  dimManufacturer!: DimManufacturer;

  // Measures
  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  value_sales!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  unit_sales!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  avg_price_per_unit_calculated!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  base_price!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  promo_price!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 9, nullable: true })
  discount!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  promo_units!: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 5, nullable: true })
  promo_value!: number | null;

  @CreateDateColumn() // Automatically set to current date on insert
  load_timestamp!: Date;
}