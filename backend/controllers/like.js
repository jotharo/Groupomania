// Modèle : 'post' + 'user'

const post = require('../models').post
const user = require('../models').user
const like = require('../models').like


// Exportation des modules

module.exports = {
    likePost,
    deleteLike
    /* 
    getAllLike,
    getOneLike ???
    */
}

// LIKE A POST


async function likePost (req, res, next) {

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

    const alreadyLiked = like.findOne({ where : { 
        userId: authUser.id, 
        postId: req.params.id
    }}) 

    if (alreadyLiked) {
        return like.destroy()
        .then (() => res.status(201).json({ message: "Like annulé" }))
        .catch(error => res.status(400).json({ error }))
    } 
    else {
        return like.create({
            userId: authUser.id,
            postId: req.params.id
        })
        
        .then (() => res.status(201).json({ message: "Like ajouté" }))
        .catch(error => res.status(404).json({ error }))
    }   
}

// DELETE LIKE // A SUPPRIMER

async function deleteLike(req, res, next) {

    
like.findOne({ where: { id: req.params.id }})

.then(like =>{
 
  like.destroy()
    .then(() => res.status(200).json({ message: 'Like supprimé !' }))
    .catch(error => res.status(400).json({ error }))
})
.catch(error => res.status(500).json({ error }))
}


/*

// GET ALL LIKES

async function getAllLike  (req, res, next){
    like.findAll({
        where: { postId: req.params.postId }
    })  
    .then(likes => res.status(200).json({ likes }))
    .catch(error => res.status(404).json({ error }))
}

// GET ONE LIKE

async function getOneLike  (req, res, next){
    like.findOne({
        where: { postId: req.params.postId },
        include : user
    })  
    .then(like => res.status(200).json({ like }))
    .catch(error => res.status(404).json({ error }))
}

*/