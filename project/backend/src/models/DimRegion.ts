import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'dim_region' })
export class DimRegion {
  @PrimaryGeneratedColumn()
  region_key!: number;

  // We'll use the 'Region' column from source, assuming it's unique like 'ALL', 'AREA I'
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  region_name!: string;

  @Column({ type: 'varchar', length: 50, nullable: true }) // From your 'Market' column
  @Index()
  market!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true }) // From your 'Business_Unit' column
  @Index()
  business_unit!: string | null;
}