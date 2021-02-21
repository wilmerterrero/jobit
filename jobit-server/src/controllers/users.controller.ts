import { UsersModel } from '../models/users.model'; 
import { body } from 'express-validator';
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Request, Response } from 'express';    
import { SecretKey } from '../config/jwt.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

@EntityRepository(UsersModel)
export default class UsersController extends AbstractRepository<UsersModel>{

    constructor(){ super(); }

    public async Register(req: Request, res: Response): Promise<Response>{
        try{    
            const { username, email, password, role } = req.body;
            if(!username || !email || !password) {
                console.log('Provide missing fields');
                return res.status(400).json({msg: 'Provide missing fields'});
            }

            body('email').isEmail().notEmpty().withMessage('Please provide a valid email');
            body('password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a password greater than 8 digits');
            
            const FindUser = await UsersModel.findOne({email: email});
            if(!FindUser){
                const CreateUsers = await UsersModel.create({username: username, email: email, password: password, role: role});
                const SaveUsers = await UsersModel.save(CreateUsers);

                if(SaveUsers.role == "client" && await UsersModel.count({role: "admin"}) == 0){
                    SaveUsers.role = "admin";
                    await SaveUsers.save();
                }

                return res.status(201).json({msg: SaveUsers});  
            }

            console.log("User already exists or it has admin role");
            return res.status(400).json({msg: 'User already exists or it has admin role'});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }   
    }

    public async Login(req: Request, res: Response): Promise<Response> {
        try{
            const { email, password } = req.body;
            if(!email || !password) {
                console.log('Provide missing fields');
                return res.status(400).json({msg: 'Provide missing fields'});
            }

            body('Email').isEmail().notEmpty().withMessage('Please provide a valid Email');
            body('Password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a Password greater than 8 digits');

            const FindUser = await UsersModel.findOne({email: email});
            if(!FindUser){
                console.log('User does not exist');
                return res.status(400).json({msg: 'User does not exist'});
            }

            const Token = await jwt.sign({id: FindUser.id, email: FindUser.email, role: FindUser.role}, SecretKey.key, {
                expiresIn: '8h'
            });

            const MatchPassword = await bcrypt.compare(password, FindUser.password);
            if(MatchPassword){
                return res.status(201).json({msg: Token})
            }

            console.log('Error on logging in the user');
            return res.status(400).json({msg: 'Error on logging in the user'});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async GetUserInfo(req: Request, res: Response): Promise<Response>{
        try {
            const header: any = await req.headers['authorization'];
            const token: any = await header && header.split(' ')[1];

            const decoded = await jwt.decode(token);
            
            console.log(decoded);
                return res.status(200).json({msg: decoded})
        }
        catch(error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async ChangeRole(req: Request, res: Response): Promise<Response>{
        try{
            const { email, role } = req.body;
            if(!email || !role) return res.status(400).json({msg: 'Provide missing fields'});

            const FindUser = await UsersModel.findOne({email: email});
            if(FindUser){
                await UsersModel.update({email: email}, {role: role})
                return res.status(200).json({msg: "User role has been updated"});
            }

            return res.status(200).json({msg: "Something went wrong"});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }
}