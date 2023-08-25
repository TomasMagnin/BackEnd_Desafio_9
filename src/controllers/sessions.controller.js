import passport from 'passport';
import { UserDTO } from "../DAO/DTO/user.dto";
import logger from "../utils/logger.js";


class  SessionsController {

 async renderSessionView(req, res) {
    try {
        return res.send(JSON.stringify(req.session));    
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        }); 
    }
 };

 async getCurrentUser(req, res) {
    try {
        const user = new UserDTO(req.session);
        return res.status(200).json({ user });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }  
};

 async renderGitHubLogin(req, res) {
    try {
        return passport.authenticate('github', { scope: ['user:email'] })(req, res);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }  
 };

 async handleGitHubCallback(req, res, next) {
    try {
        passport.authenticate('github', { failureRedirect: '/login' })(req, res, (err) => {
            if (err) {
                logger.error('Error in auth GitHub callback:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.redirect('/');
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }  
 };

}

export const sessionsController = new SessionsController();

