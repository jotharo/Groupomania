// CONTROLLER : user

// Packages 

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// Modèle 'user'

const user = require('../models/index').user


// Exportation des modules

module.exports = {
    signupUser,
    loginUser,
    editUser,
    getOneUser,
    getAllUser,
    deleteUser
}

// Middlewares


//SIGNUP USER

async function signupUser(req, res, next) {
    // Vérifie les paramètres
    bcrypt.hash(req.body.password, 10) // Fonction de hachage du mot de passe de la requête : ici on « sale » le MDP 10 fois.
    .then(hash => { // Récupération du MDP hashé
        if(req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
            res.status(201).json("{'Votre compte a bien été créé !'}")
            return user.create({
                email: req.body.email, 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
            })     
        }
        else {
            return res.status(400).json("{'error': 'Il manque un ou des paramètres'}")
        }
    })
    .catch (error => { res.status(500).json("{'error': 'Impossible d'enregistrer un nouvel utilisateur'}")})
}

//LOGIN USER

async function loginUser(req, res, next){
    user.findOne({ where : { email: req.body.email } })   // 1 - Vérification de l'existence de l'user dans la BD : comparatif adresse e-mail.
      .then(userLogged => {
        if (!userLogged) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // Si pas d'adresse mail similaire : erreur.
        }
        bcrypt.compare(req.body.password, userLogged.password)  // 2 - Si 1 OK : vérification du mot de passe avec Bcrypt.
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });// Si pas de mot de passe similaire dans la DB : erreur.
            }
            let tokenAuth = jwt.sign({ userId: userLogged.id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' }) 
            userLogged.token = tokenAuth
            userLogged.save()
            .then(userLogged => {
              res.status(200).json({
                userId: userLogged.id,
                token: tokenAuth
              })
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
    


//UPDATE PROFILE USER

async function editUser(req, res, next){

    //findByPk
    user.findOne({ where: { id: req.params.id } }) 
 
    .then(user =>{ // On change les champs 
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName 
    
        if(req.file) { // On enregistre l'image si tout les champs sont valides
          const filename = user.imageUrl.split('/public/')[1]
          fs.remove(`images/${filename}`)
          user.profilePicture= `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
        }
        return user.save()// On sauvegarde la sauce modifiée dans la DB.
      }).then(() => res.status(200).json({ message: 'Profil modifié !'}))// Succès enregistrement.
        .catch(error => res.status(400).json({ error }));  // Erreur enregistrement.
}

// GET ALL USERS

async function getAllUser (req, res, next){
    user.findAll()
    .then(users => res.status(200).json({ users }))
    .catch(error => res.status(404).json({ error }))
  }

// GET ONE USER

async function getOneUser(req, res, next){
    user.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(404).json({ error }))
}


//DELETE USER

async function deleteUser(req, res, next) {
    user.findOne({ where: { id: req.params.id } }) 
    .then(user => { 
        if (user.profilPicture !== null) {
            const filename = user.profilPicture.split('/public/')[1]; 
            fs.remove(`public/${filename}`, () => { 
                user.destroy({where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                    .catch(error => res.status(400).json({ error :"1 - Impossible de supprimer l'utilisateur " }))
            })
        } 
        else {
        user.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error :"2 - Impossible de supprimer l'utilisateur " }));
        }
    })
    .catch(error => res.status(500).json({ error :"Impossible de supprimer l'utilisateur " }))
}


