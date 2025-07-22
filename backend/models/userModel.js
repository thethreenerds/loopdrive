const db = require('../config/db');

const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

const createUser = async (username, email, hashedPassword) => {
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

}

module.exports = { findUserByEmail, createUser};