import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Continent } from "./continent";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  emoji!: string;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @Field(() => [Continent])
  continent!: Continent;
}
