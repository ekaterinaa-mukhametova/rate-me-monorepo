const express = require('express');
const dotenv = require('dotenv').config();
const db = require('../models/dataBase');
const User = require('../models/User');
const authMiddlware = require('../middlware/authMiddlware');
const isAdminMiddlware = require('../middlware/isAdminMiddlware');

const user = new User();

const router = express.Router();

router.put('/log-in', async (req, res) => {
  const { email, password, lastLoginDate } = req.body.data;

  try {
    const { token, userId, name } = await user.logIn({ email, password, lastLoginDate });
    res.send({
      result: 'ok', token, userId, name,
    });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

router.put('/sign-up', async (req, res) => {
  const {
    name, email, password, regDate, lastLoginDate,
  } = req.body.data;
  try {
    const { token, userId } = await user.signUp({
      name, email, password, lastLoginDate, regDate,
    });
    res.send({ result: 'ok', token, userId });
  } catch (err) {
    console.log(err);
    res.send({ result: 'error', message: err.message });
  }
});

router.get('/users-data', authMiddlware, isAdminMiddlware, async (req, res) => {
  try {
    const usersData = await db.any('SELECT * from users');
    res.send({ result: 'ok', usersData });
  } catch (err) {
    res.send({ result: 'error', message: err.message });
  }
});

module.exports = router;
