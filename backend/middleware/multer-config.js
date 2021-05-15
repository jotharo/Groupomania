// MIDDELWARE MULTER : gestion de fichiers entrants dans les requêtes HTTP

const multer = require('multer');

const MIME_TYPES = {   // On crée un dictionnaire des types MIME qui définit le format des images

  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({   // Création d'une const storage: à passer à multer comme configuration, 
                                       // indique à multer où enregistrer les fichiers entrants. 
  destination: (req, file, callback) => {    //Fonction destination : indique à multer d'enregistrer 
    callback(null, 'public');                //les fichiers dans le dossier images.
  },
  filename: (req, file, callback) => {            //Fonction filename : indique à multer d'utiliser le nom d'origine,
    const name = file.originalname.split(' ').join('_');// et de remplacer les espaces par des underscores.
    const extension = MIME_TYPES[file.mimetype];     // Const de type MIME pour résoudre l'extension de fichier appropriée,
    callback(null, name + Date.now() + '.' + extension); //et ajouter un timestamp Date.now() comme nom de fichier. 
  }
});

module.exports = multer({storage: storage}).single('image');  // Export de l'élément multer entièrement configuré, 
                                                            // on lui passe notre constante storage, 
                                                            //et lui indiquons que nous gérerons uniquement les  téléchargements de fichiers image.