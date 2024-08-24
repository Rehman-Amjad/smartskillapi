const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'auth-db1050.hstgr.io',  // Replace with your actual host
    user: 'u848909398_0_donatel',         // Replace with your MySQL username
    password: 'u848909398_0_Donatel',     // Replace with your MySQL password
    database: 'u848909398_0_donatel', // Replace with your actual database name
    waitForConnections: true,
    connectionLimit: 10,  // Number of connections in the pool
    queueLimit: 0
});

// Export the pool for use in other modules
const poolPromise = pool.promise();

// Check the connection
poolPromise.getConnection()
    .then(connection => {
        console.log('Connected to the MySQL database.');
        connection.release();  // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Unable to connect to the MySQL database:', err.message);
    });

module.exports = poolPromise;