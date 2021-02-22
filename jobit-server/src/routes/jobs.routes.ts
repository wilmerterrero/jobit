import express, { Router } from 'express';
import JobsController  from '../controllers/jobs.controller';
import passport from 'passport';
    
class JobsRoutes{
    public router: express.Router;

    public constructor(){
        this.router = Router();
        this.Routes();
    }

    private Routes(){
        const jobsController = new JobsController();

        this.router.get('/', jobsController.GetAllJobs);
        this.router.get('/one/', jobsController.GetOneJob);
        this.router.get('/pages/', jobsController.PaginatedJobs);
        this.router.post('/publish/', passport.authenticate('jwt', {session: false}) ,jobsController.PostJobs);
        this.router.put('/update/', passport.authenticate('jwt', {session: false}) ,jobsController.UpdateJobs);
        this.router.delete('/delete/one/', passport.authenticate('jwt', {session: false}) ,jobsController.DeleteOneJob)
        this.router.delete('/delete/', passport.authenticate('jwt', {session: false}) ,jobsController.DeleteAllJobs);
    }
}

export const JobsRouter = new JobsRoutes().router;