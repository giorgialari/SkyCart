const pool = require('../db');
const bcrypt = require('bcrypt');

exports.createUser = async (username, password, name) => {
  const connection = await pool.getConnection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const [results] = await connection.execute("INSERT INTO users (username, password, name) VALUES (?, ?, ?)", [username, hashedPassword, name]);
  connection.release();
  return results;
};

exports.findUserByUsername = async (username) => {
  const connection = await pool.getConnection();
  const [results] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
  connection.release();
  if (results.length === 0) {
    return null;
  }
  return results[0];
};
