import packageJSON from '../package.json';

module.exports = {
  app: {
    version: packageJSON.version,
    title: 'goal-tracker',
    description: packageJSON.description
  },
  dir_structure: {
    models: 'app/models/**/*.js',
    routes: 'app/routes/**/*Routes.js',
    controllers: 'app/conrollers/**/*Controller.js'
  },

  db: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root', 
    password: 'root',
    database: 'goal_tracker'
  }
};


// uri: "mongodb+srv://ankit123:ankit123456@cluster0-8rn1u.mongodb.net/yuc?retryWrites=true&w=majority",

//uri: "mongodb://localhost/yucreat",

//uri:'mongodb://new123:new123456@cluster0-shard-00-00-al6lh.mongodb.net:27017,cluster0-shard-00-01-al6lh.mongodb.net:27017,cluster0-shard-00-02-al6lh.mongodb.net:27017/yucreat?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
