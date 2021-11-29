import config from '../config/default';
import bluebird from 'bluebird';
import logger from './logger';
import mysql from 'mysql';


export function connect(cb) {
  console.log("%%%%%%%%%%%%%%%%%",config.db);
   const MysqlPool =  mysql.createConnection(config);
   module.exports = MysqlPool;
   cb(MysqlPool);
  // mongoose.Promise = bluebird;
  // const db = mongoose.connect(config.db.uri, {useNewUrlParser: true ,useUnifiedTopology: true},(err) => {
  // if (err) {
  //     logger.error('Could not connect to MongoDB!');
  //     logger.error(err);
  //   } else {
    
  //     if (cb) cb(db);
  //   }
  // });
}
