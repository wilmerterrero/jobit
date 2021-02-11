<<<<<<< HEAD
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

//config imports
import { SearchConnectionConfig } from './config/connection.config';
import passport from 'passport';
import passportStrategy from './config/passport.config';

//router imports
import { AuthRouter } from './routes/auth.routes';
import { JobsRouter } from './routes/jobs.routes';

class Server{
    private app: express.Application;
    private port: number;

    constructor(){
        this.port = 8080;
        this.app = express();
        this.Config();
        this.Routes();
    }

    private Config(){
        //middlewares
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(passport.initialize());

        //config middlewares
        SearchConnectionConfig();
        passport.use(passportStrategy);
    }

    private Routes(){
        //main router endpoints
        this.app.use('/auth', AuthRouter);
        this.app.use('/jobs', JobsRouter);
    }

    public Start(){
        try{
            this.app.listen(this.port, () => console.log(`App is running on localhost:${this.port}`));
        }
        catch(error){
            console.error(`Error at: ${error}`);
        }
    }
}

const server = new Server();
=======
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

//config imports
import { SearchConnectionConfig } from './config/connection.config';
import passport from 'passport';
import passportStrategy from './config/passport.config';
import { config } from 'dotenv';

//router imports
import { AuthRouter } from './routes/auth.routes';
import { JobsRouter } from './routes/jobs.routes';

class Server{
    private app: express.Application;
    private port: number|string;

    constructor(){
        this.port = process.env.PORT || 8080;
        this.app = express();
        this.Config();
        this.Routes();
    }

    private Config(){
        //middlewares
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(passport.initialize());

        //config middlewares
        SearchConnectionConfig();
        config();
        passport.use(passportStrategy);
    }

    private Routes(){
        //main router endpoints
        this.app.use('/auth', AuthRouter);
        this.app.use('/jobs', JobsRouter);
    }

    public Start(){
        try{
            this.app.listen(this.port, () => console.log(`App is running on localhost:${this.port}`));
        }
        catch(error){
            console.error(`Error at: ${error}`);
        }
    }
}

const server = new Server();
>>>>>>> e9c5bb19826e0e0b09f8992e50a71f96bca9fe83
server.Start();