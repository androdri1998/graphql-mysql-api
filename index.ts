import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { UsersResolver } from "./src/users/infra/resolvers/Users.resolver";
import { ProfilesResolver } from "./src/profiles/infra/resolvers/Profiles.resolver";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UsersResolver, ProfilesResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });

  console.log(`server listening at ${url}`);
};

main();
