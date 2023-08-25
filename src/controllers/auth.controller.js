import { UserModel } from "../DAO/mongo/models/users.model.js";
import { CustomError } from "../services/errors/custom-error.js";
import EErros from "../services/errors/enums.js";
import logger from "../utils/logger.js";

class AuthController {

async renderSessionView(req, res) {
        return res.send(JSON.stringify(req.session));    
 }

 async renderLoginView(req, res) {
        return res.render("login", {});    
 };

 async handleLogin(req, res) {
        if (!req.user) {
            CustomError.createError({
                name: 'fields missing or incorrect',
                cause: 'there was an error in one of the methods',
                message: 'validation error: please complete or correct all fields.',
                code: EErros.VALIDATION_ERROR,
            });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
        return res.redirect('/api/products');
 };

async renderFailLoginView(req, res) {
        return res.json({ error: 'fail to login' });   
 };

 async renderRegisterView(req, res) {
        return res.render("register", {});    
 };

 async handleRegister(req, res) {
        if (!req.user) {
            CustomError.createError({
                name: 'Controller message error',
                cause: 'there was an error in one of the methods',
                message: 'something went wrong :(',
                code: EErros.INTERNAL_SERVER_ERROR,
            });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
        return res.redirect('/auth/login');
 };

async renderFailRegisterView(req, res) {
        return res.json({ error: 'fail to register' });    
 };

 renderProductsView = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.session.email });
        if (user) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                cartID: user.cartID,
                role: user.role,
            };
            logger.debug('Rendering products view with user data:', userData);
            return res.render('products', { user: userData });
        } else {
            logger.debug('Rendering products view with no user data');
            return res.render('products', { user: null });
        }
    } catch (error) {
        logger.error('Error retrieving user data:', error);
        return res.render('products', { user: null, error: 'Error retrieving user data' });
    }
 };

 async renderProfileView(req, res) {
        const user = { email: req.session.email, role: req.session.role };
        return res.render('profile', { user: user });    
 };

 async handleLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { error: 'session couldnt be closed' });
            }
            return res.redirect('/auth/login');
        });
 };

 async renderAdministrationView(req, res) {
    try {
        const user = req.session.user;
        return res.render('admin',{user});
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

async handleGitHubCallback(req, res) {
    try {
        passport.authenticate('github', { failureRedirect: '/login' })(req, res, (err) => {
            if (err) {
                console.error('Error in auth GitHub callback:', err);
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


export const authController = new AuthController();
