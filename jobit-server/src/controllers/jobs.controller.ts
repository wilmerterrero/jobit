import { JobsModel } from '../models/jobs.model';
import { Request, Response } from 'express';    
import { EntityRepository, AbstractRepository } from 'typeorm';

@EntityRepository(JobsModel)
export default class JobsController extends AbstractRepository<JobsModel>{

    constructor(){ super(); }

    public async GetAllJobs(req: Request, res: Response): Promise<Response>{
        const Jobs = await JobsModel.find({});
        return res.status(200).json({msg: Jobs});
    }

    public async GetOneJob(req: Request, res: Response): Promise<Response>{
        const { id } = req.body;
        if(!id) return res.status(401).json({msg:"Provide the id field or id value was not a number"});

        const Job = await JobsModel.findOne({id: id});
        return res.status(200).json({msg: Job});
    }

    public async PaginatedJobs(req: Request, res: Response): Promise<Response> {
        const { skip, take } = req.body;

        if(skip >= 0 && take > 0){
            const Pagination = await JobsModel.find({skip: skip, take: take});

            return res.status(200).json({msg: Pagination});
        }
        
        return res.status(400).json({msg: "Something went wrong"}); 
    }

    public async PostJobs(req: Request, res: Response): Promise<Response>{
        try {
            const { location, position, company, type, description } = req.body;
            if(!location || !position || !company || !type) return res.status(401).json({msg: "Provide the necessary fields"});
            
            const CreateJobs = await JobsModel.create({location: location, position: position, company: company, type: type, description: description});
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
            const { id, location, position, company, type } = req.body;
            if(!id || !location || !position || !company || !type) return res.status(401).json({msg: "Provide the necessary fields"});

            const Job = await JobsModel.findOne({id: id});
            if(Job) await JobsModel.update({id: id}, {location: location, position: position, company: company, type: type});

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
            const { id } = req.body;
            if(!id) return res.status(401).json({msg: "Provide the necessary fields"});

            const Job = await JobsModel.findOne({id: id});
            if(Job) await JobsModel.remove(Job);

            return res.status(201).json({msg: 'Job removed'})
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }
}
