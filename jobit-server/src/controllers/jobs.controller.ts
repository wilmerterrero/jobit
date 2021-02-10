import { JobsModel } from '../models/jobs.model';
import { Request, Response } from 'express';    
import { EntityRepository, AbstractRepository } from 'typeorm';
import { UsersModel } from '../models/users.model';

@EntityRepository(JobsModel)
export default class  extends AbstractRepository<JobsModel>{

    constructor(){ super(); }

    public async GetAllJobs(req: Request, res: Response): Promise<Response>{
        const Jobs = await JobsModel.find({});
        return res.status(200).json({msg: Jobs});
    }

    public async GetOneJob(req: Request, res: Response): Promise<Response>{
        const { Id } = req.body;
        if(!Id || Id.typeof != Number) return res.status(401).json({msg:"Provide the id field or id value was not a number"});

        const Job = await JobsModel.findOne({id: Id});
        return res.status(200).json({msg: Job});
    }

    public async PostJobs(req: Request, res: Response): Promise<Response>{
        try {
            const { Location, Position, Company, Type } = req.body;
            if(!Location || !Position || !Company || !Type) return res.status(401).json({msg: "Provide the necessary fields"});
            
            const CreateJobs = await JobsModel.create({location: Location, position: Position, company: Company, type: Type});
            const SaveJobs = await JobsModel.save(CreateJobs);
    
            return res.status(201).json({msg: SaveJobs});    
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error})
        }
    }

    public async UpdateJobs(req: Request, res: Response){

    }

    public async DeleteAllJobs(req: Request, res: Response){

    }

    public async DeleteOneJob(req: Request, res: Response){

    }
}
