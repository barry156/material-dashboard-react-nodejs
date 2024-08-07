import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import upload from '../multerConfig.js';



const router = express.Router();
import { getProfileRouteHandler, patchProfileRouteHandler } from "../../services/me/index.js";

// get user's profile
router.get("/", passport.authenticate('jwt',{session: false}), (req, res) => {
  getProfileRouteHandler(req, res);
});

// update user's profile
router.patch("/", passport.authenticate('jwt',{session: false}), async (req, res) => {
  patchProfileRouteHandler(req, res);
});

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('profileImage'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({error: 'Please upload a file'});
  }

  try {
    // Sauvegarde le chemin de l'image dans la base de données
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    user.profileImage = file.path;
    // Reste du code...
  } catch (error) {
    // Gestion des erreurs...
  }
});
export default router;
