import { UsersModel } from '../models/users.model'; 
import { body } from 'express-validator';
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Request, Response } from 'express';    
import { SecretKey, RefreshSecretKey } from '../config/jwt.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

@EntityRepository(UsersModel)
export default class UsersController extends AbstractRepository<UsersModel>{

    constructor(){ super(); }

    public async Register(req: Request, res: Response): Promise<Response>{
        try{    
            const { Username, Email, Password, Role } = req.body;
            if(!Username || !Email || !Password) return res.status(400).json({msg: 'Provide missing fields'})

            body('Email').isEmail().notEmpty().withMessage('Please provide a valid Email');
            body('Password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a Password greater than 8 digits');
            
            const FindUser = await UsersModel.findOne({email: Email});
            if(!FindUser){
                const CreateUsers = await UsersModel.create({username: Username, email: Email, password: Password, role: Role});
                if(CreateUsers.role == "admin") return res.status(400).json({msg: "User cant have admin role"}); 

                const SaveUsers = await CreateUsers.save();
                return res.status(201).json({msg: SaveUsers});
            }

            return res.status(400).json({msg: 'User already exists or it has admin role'});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }   
    }

    public async Login(req: Request, res: Response): Promise<Response> {
        try{
            const { Email, Password } = req.body;
            if(!Email || !Password) return res.status(400).json({msg: 'Provide missing fields'});

            body('Email').isEmail().notEmpty().withMessage('Please provide a valid Email');
            body('Password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a Password greater than 8 digits');

            const FindUser = await UsersModel.findOne({email: Email});
            if(!FindUser){
                return res.status(400).json({msg: 'User does not exist'});
            }

            const Token = await jwt.sign({id: FindUser.id, email: FindUser.email}, SecretKey.key, {
                expiresIn: '8h'
            });

            const MatchPassword = await bcrypt.compare(Password, FindUser.password);
            if(MatchPassword){
                return res.status(201).json({msg: Token});
            }

            return res.status(400).json({msg: 'Error on logging in the user'});
        }
        catch(error){
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }
}