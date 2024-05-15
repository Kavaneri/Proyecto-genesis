const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "clave",
    host: "localhost",
    port: 5432,
    database: "testVet"
});

module.exports = pool;