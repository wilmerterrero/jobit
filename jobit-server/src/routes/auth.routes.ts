import express, { Router } from 'express';
import passport from 'passport';
import UsersController from '../controllers/users.controller';
import { isAdmin } from '../middlewares/authorization';

class AuthRoutes{
    public router: express.Router;

    public constructor(){
        this.router = Router();
        this.Routes();
    }

    private Routes(){
        const usersController = new UsersController();
        
        this.router.post('/register', usersController.Register);
        this.router.post('/login', usersController.Login);
        this.router.post('/login/admin/change', passport.authenticate('jwt', { session: false }), isAdmin, usersController.ChangeRole);
        this.router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, usersController.GetAllUsers);
        this.router.get('/', passport.authenticate('jwt', { session: false }), usersController.GetUserInfo);
    }
}

export const AuthRouter = new AuthRoutes().router;