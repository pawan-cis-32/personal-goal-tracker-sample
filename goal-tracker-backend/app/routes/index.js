import initUserRoutes from './userRoutes';
import express from 'express';
import { path, join } from 'path';




const initRoutes = (app) => {
  app.use(`/user`, initUserRoutes());




  // Catch all other routes and return the index file
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '/../public/dist/yucreat/index.html'));
  // });
 
  //const DIST_FOLDER = join(process.cwd(), 'dist');

  //app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

  // return rendered '*' or '/*' index.html on every request
 /* app.get('*', (req, res) => {
    require('zone.js/dist/zone-node');
    require('reflect-metadata');
    res.render('index.html', { req, res });
    //console.log(`new GET request at : ${req.originalUrl}`);
  });

  // Catch all other routes and return the index file
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/admin/dist/index.html'));
  });*/
 };

export default initRoutes;
