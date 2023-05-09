const db = require('./dataBase');
const { createAuthToken } = require('../helpers/jsonWebToken');
const { generateHash } = require('../helpers/crypto');
const { insertValuesOnDB } = require('../helpers/pg-promise');
const userSchema = require('../schemas/user');

class User {
  tableName = 'users';

  // eslint-disable-next-line class-methods-use-this
  logIn = async ({ email, password, lastLoginDate }) => {
    const registeredUser = await db.any(`SELECT * FROM ${this.tableName} WHERE ${userSchema.email} = $1 AND ${userSchema.password} = $2`, [email, password]);
    if (!registeredUser.length) {
      throw new Error('Incorrect email or password');
    }
    await db.none(`UPDATE ${this.tableName} SET ${userSchema.lastLoginDate} = $1 WHERE ${userSchema.email} = $2`, [lastLoginDate, email]);

    const token = createAuthToken({ email, password });
    const { user_id: userId } = await db.one(`SELECT ${userSchema.userId} FROM ${this.tableName} WHERE ${userSchema.email} = $1`, [email]);
    const { name } = await db.one(`SELECT ${userSchema.name} FROM ${this.tableName} WHERE ${userSchema.email} = $1`, [email]);
    return { token, userId, name };
  };

  // eslint-disable-next-line class-methods-use-this
  signUp = async (userData) => {
    // name, email, password, lastLoginDate, regDate,
    const { email, password, lastLoginDate } = userData;
    const token = createAuthToken({ email, password });
    const userId = generateHash([email, lastLoginDate]);

    const registeredUser = await db.any(`SELECT * FROM ${this.tableName} WHERE ${userSchema.email} = $1`, email);
    if (registeredUser.length) {
      throw new Error('User already exist');
    }

    const columnSet = Object.values(userSchema);
    const values = Object.entries(userData).map(([key, value]) => ({ [userSchema[key]]: value }));
    values.push({ [userSchema.is_admin]: false });

    await insertValuesOnDB({
      table: 'users',
      columnSet,
      values,
    });

    return { token, userId };
  };
}

module.exports = User;
