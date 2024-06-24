import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const ormConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // TODO false in prod !!!
  autoLoadEntities: true,
  entities: [join(__dirname, 'src/**/*.entity.ts')],
  //logging: true,
  logging: ["error", "warn"],
  // TODO logger: new MyCustomLogger(), // https://typeorm.io/logging#
}

export { ormConfig };