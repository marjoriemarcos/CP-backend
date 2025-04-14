import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import CountryResolver from "./resolvers/CountryResolver";
import ContinentResolver from "./resolvers/ContinentResolver";

const port = 4000;

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
start();
