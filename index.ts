import "reflect-metadata";
import "dotenv/config";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { UsersResolver } from "./src/users/infra/resolvers/Users.resolver";
import { ProfilesResolver } from "./src/profiles/infra/resolvers/Profiles.resolver";
import { databaseProvider } from "./src/app/infra/providers/DatabaseProvider";

const main = async () => {
  try {
    await databaseProvider.init();

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
  } catch (err) {
    console.log(`something went wrong! `, err);
  }
};

main();
