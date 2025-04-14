import { DataSource } from "typeorm";
import { Country } from "../entities/country";
import { Continent } from "../entities/continent";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./bdd/cp.sqlite",
  entities: [Country, Continent],
  synchronize: false,
  migrations: ["./bdd/migrations/*.ts"],
  migrationsTableName: "migrations",
});
