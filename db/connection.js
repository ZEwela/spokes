const ENV = process.env.NODE_ENV || 'development';

const { Pool } = require("pg");

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("No PGDATABASE configured")
}

const config = {}

if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
  }

module.exports = new Pool(config);