import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { SecretKey } from './jwt.config';
import { UsersModel } from '../models/users.model';

const Options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SecretKey.key
}

//the payload is the object we use, in this case the object of the logged user
export default new Strategy(Options, async(payload, verify) => {
    try{
        const FindUser = await UsersModel.findOne({id: payload.id});
        //the verify function returns an error in case of not finding a user or a user
        if (FindUser) return verify(null, FindUser);
        //if a user is not found then it will return a null from error and false from the user
        return verify(null, false);
    }
    catch(error){
        return error;
    }
});