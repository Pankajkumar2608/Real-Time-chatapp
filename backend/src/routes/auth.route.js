import express from 'express';
import { login, signup, logout , profileUpdate, checkAuth } from '../controllers/auth.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", isAuthenticated ,profileUpdate)
router.get("/check-auth", isAuthenticated, checkAuth);

export default router;
