import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Flavour } from "./flavour.entity";

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  recommendations: number;

@Column({nullable: true})
description: string

  @JoinTable()
  @ManyToMany((type) => Flavour, (flavor) => flavor.coffees, { cascade: true })
  flavours: Flavour[];
  @Column()
  location: string;
}
