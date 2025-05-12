const mysql = require('mysql');

// Renaming to 'pool' for clarity, but you can keep 'db' if you prefer
const pool = mysql.createPool({
  host: 'sql201.infinityfree.com',
  user: 'if0_38959802',
  password: 'Naveen2142', // IMPORTANT: Consider using environment variables for security
  database: 'if0_38959802_hitaishihealthcare',
  port: 3306,
  // Recommended: Add a connection limit
  // connectionLimit: 10
});

// THIS IS THE CRITICAL CHANGE:
// Instead of db.connect(), you use pool.getConnection() to test or get a connection.
// This section is for an initial check to see if the pool can get a connection.
pool.getConnection((err, connection) => {
  if (err) {
    // This is where your new ENOTFOUND error is being logged
    console.error('Error connecting to the database pool: ', err);
    return;
  }
  if (connection) {
    connection.release(); // Always release the connection back to the pool
    console.log('✅ Successfully connected to the MySQL database pool');
  }
});

module.exports = pool; // Export the pool object