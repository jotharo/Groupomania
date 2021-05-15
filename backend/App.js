const http = require('http')
const sequelize = require("./config/database")
const user = require('./models').user
const post = require('./models').post

const express = require('express') 
const bodyParser = require('body-parser')


const app = express()

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

app.use(express.json())
app.use(bodyParser.json())


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);


const normalizePort = val => {   // normalizePort : renvoie un port valide sous la forme d'un numéro ou d'une chaîne. 
    const port = parseInt(val, 10); // Pas obligatoire puisqu'on déclare un port 3000 plus loin.
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

const port = normalizePort(process.env.PORT || '3000'); // Déclaration du port 3000 par défaut.
app.set('port', port);

const errorHandler = error => {  // errorHAndler : recherche les différentes erreurs et les gère de manière appropriée.
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

const server = http.createServer(app);

server.on('error', errorHandler); // Si erreur au démarrage du serveur : voir errorHandler.

server.on('listening', () => {  // Si réussite au démarrage du serveur : renvoie confirmation.
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
