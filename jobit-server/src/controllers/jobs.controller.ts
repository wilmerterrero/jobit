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
        /*
        *TO-DO
        */
        try{
            const { Location, Position, Company, Type } = req.body;
            if(!Location || !Position || !Company || !Type) return res.status(400).json({msg: 'Provide missing fields'});

            const CreateJobs = await JobsModel.create({location: Location, position: Position, company: Company, type: Type});
            const SaveJobs = await CreateJobs.save();
            return res.status(201).json({msg: SaveJobs});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async UpdateJobs(req: Request, res: Response){

    }

    public async DeleteAllJobs(req: Request, res: Response){

    }

    public async DeleteOneJob(req: Request, res: Response){

    }
}
