// CONTROLLER : post

const fs = require('fs-extra')

// Modèle : 'post'

const post = require('../models').post
const user = require('../models').user

// Exportation des modules

module.exports = {
    createPost,
    getOnePost,
    getAllPost,
    editPost,
    deletePost
}

// Middlewares

// CREATE POST

async function createPost (req, res, next ) {

  const token = req.headers.authorization.split(' ')[1] // Récupération du token dans le header

  if(token) {
      var authUser = await user.findOne({ // Récupération du user correspondant au token trouvé
          where: {
              token: token
          }
      })
      if (!authUser) {
        res.status(401).json("{'error': 'Il faut être authentifié'}")
        return
      }
  } else {
      res.status(401).json("{'error': 'Il faut être authentifié'}")
      return
  }

  let postObject = req.body

  if (req.file) {
    postObject = JSON.parse(req.body.post)
    postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  if( req.body.message || req.body.imageUrl ) {
    return post.create({
        writerId: authUser.id,
        message: req.body.message,
        imageUrl: postObject.imageUrl
    }) 
   .then (() => res.status(201).json({ message: "Publication réussie" }))
   .catch(error => res.status(400).json({ error }))
  }   
  else {
    return res.status(400).json("{'error': 'Il faut mettre du contenu !'}")
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
    post.findOne({ where: { id: req.params.id }}) 
 
    .then(post =>{ // On change les champs 
        post.message = req.body.message
    
        if(req.file) { // On enregistre l'image si tout les champs sont valides
          const filename = user.imageUrl.split('/images/')[1]
          fs.remove(`images/${filename}`)
          user.profilePicture= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  if (!post) {
    res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
  }
  post
    .destroy()
    .then(() =>
      res.status(200).json({ message: 'Publication supprimée !' })
    )
    .catch(error => res.status(400).json({ error }))
})
.catch(error => res.status(500).json({ error: error.message }))
}




