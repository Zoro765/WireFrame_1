import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity({ name: 'dim_date' })
export class DimDate {
  @PrimaryColumn({ type: 'int' }) // Format: YYYYMMDD
  date_key!: number;

  @Column({ type: 'date' })
  @Index()
  full_date!: Date;

  @Column({ type: 'int' })
  @Index()
  year!: number;

  @Column({ type: 'int' }) // 1, 2, 3, 4
  @Index()
  quarter!: number;

  @Column({ type: 'int' }) // 1-12
  @Index()
  month!: number;

  @Column({ type: 'varchar', length: 20 })
  month_name!: string;

  @Column({ type: 'int' }) // 1-31
  day_of_month!: number;

  @Column({ type: 'varchar', length: 20 })
  day_of_week_name!: string;
}