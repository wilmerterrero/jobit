import { JobsModel } from '../models/jobs.model';
import { UsersModel } from '../models/users.model';
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
        const { id } = req.params;
        if(!id) return res.status(401).json({msg:"Provide the id field or id value was not a number"});

        const Job = await JobsModel.findOne({id: parseInt(id)});
        return res.status(200).json({msg: Job});
    }

    public async PaginatedJobs(req: Request, res: Response): Promise<Response> {
        const { skip, take } = req.params;
        
        if(parseInt(skip) >= 0 && parseInt(take) > 0){
            const Pagination = await JobsModel.find({skip: parseInt(skip), take: parseInt(take)});
            const allPages = await JobsModel.count();
            const pageCount =  Math.floor(allPages / parseInt(take));   
            const currentPage = Math.floor(parseInt(skip) / pageCount);

            return res.status(200).json({totalCount: allPages, perPage: take, pageCount: pageCount, currentPage: currentPage, info: Pagination});
        }
        
        return res.status(400).json({msg: "Something went wrong"}); 
    }

    public async PostJobs(req: Request, res: Response): Promise<Response>{
        try {
            const header: string = req.headers['authorization']!;
            const token: string = header.split(' ')[1];

            const base64Payload = token.split('.')[1];
            const payload = Buffer.from(base64Payload, 'base64');
            
            const parsedPayload = JSON.parse(payload.toString());

            const { id } = parsedPayload;

            const user: UsersModel = await UsersModel.findOneOrFail({where: {id: id}});

            const { location, position, company, type, description, category } = req.body;
            if(!location || !position || !company || !type || !category) return res.status(401).json({msg: "Provide the necessary fields"});
            
            const CreateJobs = await JobsModel.create({location: location, position: position, company: company, type: type, 
                                                       description: description, categories: category, createdBy: user});
                                     
            const SaveJobs = await JobsModel.save(CreateJobs);
                
            console.log('Job created successfully');
            return res.status(201).json({msg: SaveJobs, message: 'Job Created Successfully'});    
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async UpdateJobs(req: Request, res: Response): Promise<Response>{
        try {
            const { location, position, company, type, description, category } = req.body;
            const { id } = req.params;
            if(!id || !location || !position || !company || !type || !description || !category) {
                return res.status(401).json({msg: "Provide the necessary fields"});
            }

            const Job = await JobsModel.findOne({id: parseInt(id)});
            if(Job) {
                await JobsModel.update({id: parseInt(id)}, {location: location, position: position, company: company, type: type, 
                                                  description: description, categories: category});
            }

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
            const { id } = req.params;
            if(!id) return res.status(401).json({msg: "Provide the necessary fields"});

            const Job = await JobsModel.findOne({id: parseInt(id)});
            if(Job) await JobsModel.remove(Job);

            return res.status(201).json({msg: 'Job removed'})
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }
}
