const pgp = require('../libs/pg-promise');

const db = pgp(process.env.POSTGRESQL_DATABASE);

module.exports = db;
