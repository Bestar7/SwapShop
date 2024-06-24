import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import 'dotenv/config'

const ormConfigTest: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_TETS,
  synchronize: true,
  dropSchema: true,
  autoLoadEntities: true,
  entities: [join(__dirname, 'src/**/*.entity.ts')],
}

export { ormConfigTest };