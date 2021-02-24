import express, { Router } from 'express';
import JobsController  from '../controllers/jobs.controller';
import passport from 'passport';
import { isAdmin } from 'middlewares/isAdmin';
import { isModerator } from 'middlewares/isModerator';
    
class JobsRoutes{
    public router: express.Router;

    public constructor(){
        this.router = Router();
        this.Routes();
    }

    private Routes(){
        const jobsController = new JobsController();

        this.router.get('/', jobsController.GetAllJobs);
        this.router.get('/one/:id', jobsController.GetOneJob);
        this.router.get('/pages/:skip/:take', jobsController.PaginatedJobs);
        this.router.post('/publish/', isModerator, isAdmin, passport.authenticate('jwt', {session: false}) ,jobsController.PostJobs);
        this.router.put('/update/:id', isModerator, isAdmin, passport.authenticate('jwt', {session: false}) ,jobsController.UpdateJobs);
        this.router.delete('/delete/one/:id', isModerator, isAdmin, passport.authenticate('jwt', {session: false}) ,jobsController.DeleteOneJob);
        this.router.delete('/delete/', isAdmin, passport.authenticate('jwt', {session: false}) ,jobsController.DeleteAllJobs);
    }
}

export const JobsRouter = new JobsRoutes().router;