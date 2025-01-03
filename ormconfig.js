var dbConfig = {
  type: 'sqlite',
  synchronize: true,
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

// switch (process.env.NODE_ENV) {
//   case 'dev':
//     Object.assign(dbConfig, {
//       database: 'db.sqlite',
//       entities: ['**/*.entity.js'],
//     });
//     break;
//   case 'test':
//     Object.assign(dbConfig, {
//       database: 'test.sqlite',
//       entities: ['**/*.entity.ts'],
//       migrationsRun: true,
//     });
//     break;
//   default:
//     throw new Error('invalid environment.');
// }

module.exports = dbConfig;
