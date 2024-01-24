import { DataSource, MixedList } from "typeorm";

import { User } from "../../../users/infra/entities/User";
import { TConfig, config } from "../../constants";
import { Profile } from "../../../profiles/infra/entities/Profile";
import { UserProfile } from "../../../users/infra/entities/UserProfile";
import { IDatabaseProvider } from "../../providers/DatabaseProvider";

class DatabaseProvider implements IDatabaseProvider {
  dataSource: DataSource;

  constructor(config: TConfig, entities: MixedList<Function>) {
    this.dataSource = new DataSource({
      type: "mysql",
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.name,
      synchronize: true,
      logging: true,
      entities: entities,
      subscribers: [],
      migrations: [],
    });
  }

  async init(): Promise<void> {
    await this.dataSource.initialize();
  }

  async raw<ReturnType>(
    query: string,
    values: unknown[] = []
  ): Promise<ReturnType> {
    const result = await this.dataSource.manager.query<ReturnType>(
      query,
      values
    );

    return result;
  }
}

export const databaseProvider = new DatabaseProvider(config, [
  User,
  Profile,
  UserProfile,
]);
