import config from '../config/default';
import dev from '../config/development';
import * as express from './express';
import * as mysqlDb from './mysqlDb';
import logger from './logger';
import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

//Show project details on Start
const start = () => {
  const port = dev.port;
  const appStartMessage = () => {
    const env = process.env.NODE_ENV;
    logger.debug(`API is Initialized`);
    logger.info(`App Name : ${config.app.title}`);
    logger.info(`Server Name : ${config.app.name}`);
    logger.info(`Environment  : ${env || 'development'}`);
    logger.info(`App Port : ${port}`);
    logger.info(`Process Id : ${process.pid}`);
  };
  
  //Connect to Db
  mysqlDb.connect(() => {
    console.log("Connected.")
     const app = express.init();
     app.listen(port, appStartMessage);
  });

  
};

export default start;


