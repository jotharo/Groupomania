// Modèle : 'post' + 'user'

const post = require('../models').post
const user = require('../models').user
const comment = require('../models').comment


// Exportation des modules

module.exports = {
    createComment,
    getOneComment,
    getAllComment,
    editComment,
    deleteComment
}


  // CREATE COMMENT

async function createComment (req, res, next ) {

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
  
    if( req.body.commentMessage ) {
      return comment.create({
          userId: authUser.id,
          postId: req.params.id,
          commentMessage: req.body.commentMessage
      }) 
     .then (() => res.status(201).json({ message: "Commentaire publié" }))
     .catch(error => res.status(400).json({ error }))
    }   
    else {
      return res.status(400).json("{'error': 'Il faut mettre du contenu dans votre commentaire !'}")
    }
  }

  // GET ALL COMMENT

async function getAllComment (req, res, next){
    comment.findAll()
    .then(comments => res.status(200).json({ comments }))
    .catch(error => res.status(404).json({ error }))
  }

// GET ONE COMMENT

  async function getOneComment(req, res, next){
    comment.findOne({ where: { id: req.params.id } })
    .then(comment => res.status(200).json({ comment }))
    .catch(error => res.status(404).json({ error }))
}

// EDIT COMMENT

async function editComment(req, res, next){
    comment.findOne({ where: { id: req.params.id }}) 
 
    .then(comment =>{ // On change les champs 
        comment.commentMessage = req.body.commentMessage
    
        return comment.save()// On sauvegarde la sauce modifiée dans la DB.
      })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))// Succès enregistrement.
    .catch(error => res.status(400).json({ error })) // Erreur enregistrement.
}

// DELETE COMMENT

async function deleteComment(req, res, next) {

    // rajouter une autorisation seulement pour admin ?
    
comment.findOne({ where: { id: req.params.id }})

.then(comment =>{
 
  comment.destroy()
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }))
})
.catch(error => res.status(500).json({ error }))
}




