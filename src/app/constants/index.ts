export type TConfig = {
  database: {
    name: string;
    user: string;
    password: string;
    port: number;
    host: string;
  };
};

export const config: TConfig = {
  database: {
    name: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
    host: process.env.MYSQL_HOST,
  },
};
