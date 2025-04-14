import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Country } from "./country";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => Country, (country) => country.continent)
  @Field(() => [Country])
  countries!: Country[];
}
