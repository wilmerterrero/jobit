import { JobsModel } from '../models/jobs.model';
import { Request, Response } from 'express';    
import { EntityRepository, AbstractRepository } from 'typeorm';

@EntityRepository(JobsModel)
export default class  extends AbstractRepository<JobsModel>{

    constructor(){ super(); }

    public async GetAllJobs(req: Request, res: Response){
        
    }

    public async GetOneJob(req: Request, res: Response){

    }

    public async PostJobs(req: Request, res: Response){
        
    }

    public async UpdateJobs(req: Request, res: Response){

    }

    public async DeleteAllJobs(req: Request, res: Response){

    }

    public async DeleteOneJob(req: Request, res: Response){

    }
}
