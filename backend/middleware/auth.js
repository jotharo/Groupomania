
// MIDDLEWARE AUTH :  gestion de l'authentification

const jwt = require('jsonwebtoken'); // Jsonwebtoken : pour création d'un token d'authentification.

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Extraction du token du header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //Fonction verify pour décoder le token
    const userId = decodedToken.userId;                            //Extractions de l'ID utilisateur de notre token 
    if (req.body.userId && req.body.userId !== userId) { // Si user Id inconnu : invalide
      throw 'Invalid user ID';
    } else {
      next(); // Si user token OK : on passe au prochain middleware ( connexion autorisée ).
    }
  } catch {
    res.status(401
      ).json({
      error: new Error('Invalid request!') // Si user token NOT OK : connexion refusée.
    });
  }
};

