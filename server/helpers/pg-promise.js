const pgp = require('../libs/pg-promise');
const db = require('../models/dataBase');

const insertValuesOnDB = async ({
  table, columnSet, values,
}) => {
  const cs = new pgp.helpers.ColumnSet(columnSet, { table });
  const query = pgp.helpers.insert(values, cs);
  await db.none(query);
};

const updateValuesOnDB = async ({
  table, columnSet, values, condition,
}) => {
  const cs = new pgp.helpers.ColumnSet(columnSet, { table });
  const query = `${pgp.helpers.update(values, cs)} ${condition}`;
  await db.none(query);
};

module.exports = { insertValuesOnDB, updateValuesOnDB };
