require('dotenv/config');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/shared/entities/*.entity.ts'],
  migrations: ['infra/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/shared/entities/',
    migrationsDir: 'infra/typeorm/migrations',
  },
};
