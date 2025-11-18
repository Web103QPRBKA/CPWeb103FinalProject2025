import pg from "pg";
import "./dotenv.js";

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

// Only add SSL config if host is not localhost
if (process.env.PGHOST && !process.env.PGHOST.includes('localhost')) {
  config.ssl = {
rejectUnauthorized: false,
  };
}

export const pool = new pg.Pool(config);
