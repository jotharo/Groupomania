// CONTROLLER : post

//const fs = require('fs-extra')

// Modèle : 'post'

const post = require('../models').post
const user = require('../models').user

// Exportation des modules

module.exports = {
    createPost,
    getOnePost,
    getAllPost
    //editPost,
    //deletePost
}

// Middlewares

// CREATE POST

async function createPost (req, res, next ) {
    //const postObject = req.body 

     /*let attachmentPost = "";
   if (req.file) { 
        attachmentPost = `${req.protocol}://${req.get("host")}/public/${req.file.filename}` 
    }*/

    //Get the current user
    const token = req.getHeader("Authorization")

    if(token) {
        // test si le token est encore valide 
        // get the user that make the call
        var user = await user.findOne({
            where: {
                token: token
            }
        })
        if (!user) {
            res.status(401).json("{'error': 'Il faut être authentifié'}")
        }
    } else {
        res.status(201).json({ message: 'Vous êtes identifié !'})
    }

    if( req.body.message || req.body.imageUrl ) {
        return post.create({
            writerId: user.id,
            message: req.body.message,
            imageUrl: attachmentPost
        }) 
       .then (() => res.status(201).json({ message: "Publication réussie" }))
       .catch(error => res.status(400).json({ error }))
    }   
    else {
        return res.status(400).json("{'error': 'Il manque un ou des paramètres'}")
    }
}

// GET ALL POSTS

async function getAllPost (req, res, next){
    post.findAll()
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(404).json({ error }))
  }

// GET ONE POST

  async function getOnePost(req, res, next){
    post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }))
}

// EDIT POST

async function editPost(req, res, next){
    post.findOne({ where: { id: req.params.id }, include: db.User}) 
 
    .then(post =>{ // On change les champs 
        post.message = req.body.message
    
        if(req.file) { // On enregistre l'image si tout les champs sont valides
          const filename = user.imageUrl.split('/public/')[1]
          fs.remove(`images/${filename}`)
          user.profilePicture= `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
        }
        return post.save()// On sauvegarde la sauce modifiée dans la DB.
      }).then(() => res.status(200).json({ message: 'Post modifié !'}))// Succès enregistrement.
        .catch(error => res.status(400).json({ error }));  // Erreur enregistrement.
}

// DELETE POST

async function deletePost(req, res, next) {

    // rajouter une autorisation seulement pour admin ?

    post.findOne({ where: { id: req.params.id } }) 
    .then(post => { 
        if (post.imageUrl !== null) {
            const filename = user.profilPicture.split('/public/')[1]; 
            fs.remove(`public/${filename}`, () => { 
                post.destroy({where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({ error :"1 - Impossible de supprimer le post " }))
            })
        } 
        else {
        post.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error :"2 - Impossible de supprimer le post " }));
        }
    })
    .catch(error => res.status(500).json({ error :"Impossible de supprimer le post " }))
}





