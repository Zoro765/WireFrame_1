// backend/src/models/HubProduct.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class HubProduct {
  @PrimaryColumn()
  product_hashkey!: string; 

  @Column()
  product_id!: string; 

  @Column()
  load_date!: Date; 

  @Column()
  record_source!: string; // Use "!" to tell TypeScript it will be initialized later
}