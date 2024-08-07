import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import upload from '../multerConfig.js';
import { userModel } from "../../schemas/user.schema.js";



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

    user.profile_image = file.path;
    await user.save();
    res.status(200).json({message: 'Profile image updated successfully'});
  } catch (error) {
    console.error('Error updating profile image:', error);
  }
});
export default router;
