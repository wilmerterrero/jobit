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
            const { Username, Email, Password, Role } = req.body;
            if(!Username || !Email || !Password) {
                console.log('Provide missing fields');
                return res.status(400).json({msg: 'Provide missing fields'});
            }

            body('Email').isEmail().notEmpty().withMessage('Please provide a valid Email');
            body('Password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a Password greater than 8 digits');
            
            const FindUser = await UsersModel.findOne({email: Email});
            if(!FindUser){
                const CreateUsers = await UsersModel.create({username: Username, email: Email, password: Password, role: Role});
                if(CreateUsers.role == "admin" && await UsersModel.count({ role: "admin" }) > 1) {
                    console.log("There cannot be more than 1 admin");
                    return res.status(400).json({msg: "There cannot be more than 1 admin"});
                }

                const SaveUsers = await UsersModel.save(CreateUsers);
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
            const { Email, Password } = req.body;
            if(!Email || !Password) {
                console.log('Provide missing fields');
                return res.status(400).json({msg: 'Provide missing fields'});
            }

            body('Email').isEmail().notEmpty().withMessage('Please provide a valid Email');
            body('Password').isStrongPassword({minLength: 8}).notEmpty().withMessage('Please a Password greater than 8 digits');

            const FindUser = await UsersModel.findOne({email: Email});
            if(!FindUser){
                console.log('User does not exist');
                return res.status(400).json({msg: 'User does not exist'});
            }

            const Token = await jwt.sign({id: FindUser.id, email: FindUser.email, role: FindUser.role}, SecretKey.key, {
                expiresIn: '8h'
            });

            const MatchPassword = await bcrypt.compare(Password, FindUser.password);
            if(MatchPassword){
                return res.status(201).json({msg: Token});
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
            const Header: any = req.headers['authorization'];
            const Token: any = Header && Header.split(' ')[1];

            const Decoded = jwt.decode(Token);

            console.log(Decoded);
            return res.status(200).json({msg: Decoded})
        }
        catch(error) {
            console.log(error);
            return res.status(400).json({msg: error});
        }
    }

    public async ChangeRole(req: Request, res: Response): Promise<Response>{
        try{
            const { Email, Role } = req.body;
            if(!Email || !Role) return res.status(400).json({msg: 'Provide missing fields'});

            const FindUser = await UsersModel.findOne({email: Email});
            if(FindUser){
                await UsersModel.update({email: Email}, {role: Role})
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