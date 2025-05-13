const mysql = require('mysql');
const fs = require('fs');
const path = require('path'); 



require('dotenv').config();


const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306); // Use Render's PORT or DB_PORT, default 3306
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CA_CERT_PATH = process.env.CA_CERT_PATH;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error("FATAL ERROR: Database environment variables not set!");
  console.error("Please ensure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME are set.");
  process.exit(1); 
}


let sslConfig = undefined; 


if (CA_CERT_PATH) {
    try {
        const resolvedCaPath = path.resolve(CA_CERT_PATH);
        sslConfig = {
          ca: fs.readFileSync(resolvedCaPath),
          
          rejectUnauthorized: true
        };
        console.log(`Successfully loaded CA certificate from: ${resolvedCaPath}`);
    } catch (err) {
        console.error(`WARNING: Could not read CA certificate file from ${CA_CERT_PATH}. TLS connection may fail.`, err.message);
        sslConfig = undefined;
    }
} else {
    console.warn("CA_CERT_PATH environment variable is not set. TLS connection might fail if the server requires a specific CA.");
    
}


const poolConfig = {
  connectionLimit: 10, 
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: sslConfig
};


const pool = mysql.createPool(poolConfig);


pool.getConnection(err => {
  if (err) {
    console.error('Database pool connection error:', err.message);
   
    return; 
  }
  console.log('Successfully connected to the database pool.');
});

module.exports = pool;