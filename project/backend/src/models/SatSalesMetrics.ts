// backend/src/models/SatSalesMetrics.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class SatSalesMetrics {
  @PrimaryColumn()
  sales_hashkey!: string;

  @Column()
  load_date!: Date;

  @Column()
  value_sales!: number;

  @Column()
  unit_sales!: number;

  @Column()
  avg_price!: number;
}