import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, './images/'); // Assurez-vous que ce dossier existe.
  },
  filename: function (_, file, cb) {
    // Remplace les caractères ':' par '-' pour éviter les erreurs sur Windows
    const safeFilename = new Date().toISOString().replace(/:/g, '-') + file.originalname;
    cb(null, safeFilename); // Nom du fichier sauvegardé
  }
});

const fileFilter = (_, file, cb) => {
  // Accepte seulement les images
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limite la taille du fichier à 5MB
  },
});

export default upload ;