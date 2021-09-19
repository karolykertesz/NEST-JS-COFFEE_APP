import { type } from "os";
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
  @JoinTable()
  @ManyToMany((type) => Flavour, (flavor) => flavor.coffees, { cascade: true })
  flavours: string[];
  @Column()
  location: string;
}
