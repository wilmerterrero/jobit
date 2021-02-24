import { Request, Response, NextFunction } from 'express';
import { UsersModel } from '../models/users.model';

export const isModerator = async(req: Request, res: Response, next: NextFunction) => {
    const header: string = req.headers['authorization']!;
    const token: string = header.split(' ')[1];

    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    
    const parsedPayload = JSON.parse(payload.toString());

    const { role } = parsedPayload;

    const findUser = await UsersModel.findOneOrFail({role: "moderator"});
    if(findUser.role != role){
        return res.status(400).json({msg: "Not a moderator"});
    }
    else{
        next();
    }
}