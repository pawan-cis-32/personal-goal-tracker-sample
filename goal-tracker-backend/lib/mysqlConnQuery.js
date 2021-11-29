const mysql = require('mysql');
const util = require('util');
const MysqlPool = mysql.createConnection({
    "connectionLimit": 10000,
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "goal_tracker",
    "multipleStatements": true
  }
  );
MysqlPool.query = util.promisify(MysqlPool.query); // Magic happens here.
module.exports = MysqlPool;
