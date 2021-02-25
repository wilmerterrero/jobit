import express, { Router } from 'express';
import JobsController  from '../controllers/jobs.controller';
import passport from 'passport';
import { isAdmin, isAdminOrModerator } from '../middlewares/authorization';
    
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
        this.router.post('/publish/', passport.authenticate('jwt', {session: false}), isAdminOrModerator ,jobsController.PostJobs);
        this.router.put('/update/:id', passport.authenticate('jwt', {session: false}), isAdminOrModerator ,jobsController.UpdateJobs);
        this.router.delete('/delete/one/:id', passport.authenticate('jwt', {session: false}), isAdminOrModerator ,jobsController.DeleteOneJob);
        this.router.delete('/delete/', passport.authenticate('jwt', {session: false}), isAdmin ,jobsController.DeleteAllJobs);
    }
}

export const JobsRouter = new JobsRoutes().router;