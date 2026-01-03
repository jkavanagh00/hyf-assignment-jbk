import knexLibrary from "knex";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, "test.sqlite3");

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

export default knex;