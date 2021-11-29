const mysql = require('mysql2/promise');
import config from '../config/default';
const connConfig = mysql.createPool({
    "connectionLimit": 10000,
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "goal_tracker",
    "multipleStatements": true
  }
  );
module.exports = connConfig;


