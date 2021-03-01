import { UsersModel } from '../models/users.model';
import { Request, Response, NextFunction } from 'express';

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const header: string = req.headers['authorization']!;
        const token: string = header.split(' ')[1];

        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        
        const parsedPayload = JSON.parse(payload.toString());

        const { role } = parsedPayload;

        const findUser: UsersModel = await UsersModel.findOneOrFail({role: "admin"});

        findUser.role != role ? res.status(401).json({msg: "not an admin, access denied"}) : next();
    } 
    catch(error) {
        console.log(error);
        return res.status(400).json({msg: error});
    }
}

export const isAdminOrModerator = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const header: string = req.headers['authorization']!;
        const token: string = header.split(' ')[1];

        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        
        const parsedPayload = JSON.parse(payload.toString());

        const { role } = parsedPayload;

        if(role == "admin"){            
            next();
        }
        else if(role == "moderator"){
            next();
        }
        else{
            res.status(401).json({msg: "not an admin or moderator, access denied"});
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg: error});     
    }
}