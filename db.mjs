import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@ManoftheSQL',
    database: 'challenge2_db'
});

export default db;