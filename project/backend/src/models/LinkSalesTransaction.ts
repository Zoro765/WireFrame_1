// backend/src/models/LinkSalesTransaction.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class LinkSalesTransaction {
  @PrimaryColumn()
  sales_hashkey!: string;

  @Column()
  product_hashkey!: string;

  @Column()
  date_hashkey!: string;

  @Column()
  region_hashkey!: string;

  @Column()
  load_date!: Date;

  @Column()
  record_source!: string;
}