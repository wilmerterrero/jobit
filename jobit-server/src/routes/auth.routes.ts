import express, { Router } from 'express';
import UsersController from '../controllers/users.controller';

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
    }
}

export const AuthRouter = new AuthRoutes().router;