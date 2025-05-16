import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'dim_manufacturer' })
export class DimManufacturer {
  @PrimaryGeneratedColumn()
  manufacturer_key!: number;

  // From your 'Manufacturer' column
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  manufacturer_source_id!: string;

  // If you have a mapping for descriptive names, you can add a 'manufacturer_name' column
  // For now, we'll rely on the source_id.
}