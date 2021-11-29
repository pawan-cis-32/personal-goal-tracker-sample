import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import logger from './logger';
import initRoutes from './../app/routes';
import Responder from './expressResponder';
import {path} from 'path'
import {join} from 'path'
//import Socket from 'socket.io'
import compression from 'compression';

// const DIST_FOLDER = join(process.cwd(), 'dist');


// Initialize express app
const app = express();
//const io = new Socket(3002);
app.use(compression());
function initMiddleware() {
  // Showing stack errors
  app.set('showStackError', true);

  //Use headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Userid");
    next();
  });

  // Enable jsonp
  app.enable('jsonp callback');

  // Enable logger (morgan)
  app.use(morgan('combined', { stream: logger.stream }));

//For get all images
app.use('/images',express.static(__dirname+ '/../public/uploads'));
//app.use('/thumb',express.static(__dirname+ '/../public/thumb'));


//For get all file path
app.use('/file',express.static(__dirname+ '/../public'));

//For render admin pannel
// app.use('/admin',express.static(__dirname+ '/../public/admin/dist'));

// For render admin assets
// app.use('/assets',express.static(__dirname+ '/../public/admin/dist/assets'));


//For render website
//app.use(express.static(path.join(__dirname, '/../public/dist/yucreat')));
//app.use(express.static(path.join(__dirname, '/../public/admin/dist')));


//app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser'));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
}

function initErrorRoutes() {
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      next();
    }

    // Return error
    return Responder.operationFailed(res, err);
  });
}

export function init() {

  // Initialize Express middleware
  initMiddleware();

  // Initialize modules server routes
  initRoutes(app);

  // Initialize error routes
  initErrorRoutes();
  
 
 

  return app;
}
