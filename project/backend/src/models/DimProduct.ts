import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'dim_product' })
export class DimProduct {
  @PrimaryGeneratedColumn()
  product_key!: number;

  @Column({ type: 'varchar', length: 255, unique: true }) // From your 'PPG' column
  @Index()
  ppg_source_id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // From your 'Product' column
  product_name!: string | null;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  brand!: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  category!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  segment!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true }) // From your 'TYPE' column
  product_type!: string | null; // Renamed to avoid conflict with TypeORM 'type'
}