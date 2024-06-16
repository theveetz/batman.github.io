const db = require('../db');

const userModel = {
    findOne: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    create: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = userModel;
