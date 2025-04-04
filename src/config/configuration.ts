import * as process from 'node:process';

export default () => ({
  port: parseInt('1000', 10) || 3000,
  database: {
    host: process.env.DATABASE_PASSWORD,
    port: parseInt('1000', 10) || 5432,
  },
});
