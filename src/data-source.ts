import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export const ds = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ["dist/entities/*.js"],
  logging: true,
  synchronize: true,
});
