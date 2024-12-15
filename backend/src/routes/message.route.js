import express from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';

const Messagerouter = express.Router();

Messagerouter.get('/users', isAuthenticated, getUsersForSidebar);
Messagerouter.get('/:id', isAuthenticated, getMessages);
Messagerouter.post('/send/:id', isAuthenticated, sendMessage);

export default Messagerouter;