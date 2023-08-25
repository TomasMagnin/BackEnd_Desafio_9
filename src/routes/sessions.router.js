import express from "express";     
import passport from 'passport';
import { sessionsController } from '../controllers/sessions.controller.js';

export const sessionsRouter = express.Router();


sessionsRouter.get('/show', sessionsController.renderSessionView);
sessionsRouter.get('/current', sessionsController.getCurrentUser);
