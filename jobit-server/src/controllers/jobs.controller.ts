import { JobsModel } from '../models/jobs.model';
import { Request, Response } from 'express';    
import { EntityRepository, AbstractRepository } from 'typeorm';
import { UsersModel } from '../models/users.model';

@EntityRepository(JobsModel)
export default class JobsController extends AbstractRepository<JobsModel>{

    constructor(){ super(); }

    public async GetAllJobs(req: Request, res: Response): Promise<Response>{
        const Jobs = await JobsModel.find({});
        return res.status(200).json({msg: Jobs});
    }

    public async GetOneJob(req: Request, res: Response): Promise<Response>{
        const { Id } = req.body;
        if(!Id) return res.status(401).json({msg:"Provide the id field or id value was not a number"});

        const Job = await JobsModel.findOne({id: Id});
        return res.status(200).json({msg: Job});
    }

    public async PaginatedJobs(req: Request, res: Response): Promise<Response> {
        const { Skip, Take } = req.body;

        if(Skip >= 0 && Take > 0){
            const Pagination = await JobsModel.find({skip: Skip, take: Take});

            return res.status(200).json({msg: Pagination});
        }
        
        return res.status(400).json({msg: "Something went wrong"}); 
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
            return res.status(400).json({msg: error});
        }
    }

    public async UpdateJobs(req: Request, res: Response): Promise<Response>{
        try {
            const { Id, Location, Position, Company, Type } = req.body;
            if(!Id || !Location || !Position || !Company || !Type) return res.status(401).json({msg: "Provide the necessary fields"});

            const Job = await JobsModel.findOne({id: Id});
            if(Job) await JobsModel.update({id: Id}, {location: Location, position: Position, company: Company, type: Type});

            return res.status(201).json({msg: 'Job updated'})
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error})    
        }
    }

    public async DeleteAllJobs(req: Request, res: Response): Promise<Response>{
        try{
            const Jobs = await JobsModel.find({});
            if(Jobs) await JobsModel.remove(Jobs);

            return res.status(201).json({msg: 'Jobs removed'});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async DeleteOneJob(req: Request, res: Response): Promise<Response>{
        try {
            const { Id } = req.body;
            if(!Id) return res.status(401).json({msg: "Provide the necessary fields"});

            const Job = await JobsModel.findOne({id: Id});
            if(Job) await JobsModel.remove(Job);

            return res.status(201).json({msg: 'Job removed'})
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }
}
