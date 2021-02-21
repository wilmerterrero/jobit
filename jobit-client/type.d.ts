type Roles = "admin" | "client" | "moderator";

interface IUser { 
    id?: number;
    Username?: string;
    email: string;
    Password: string;
    signedIn?: Date;
    ProfilePic?: string;
    Role?: Roles;
}

type UserContextType = {
    users: IUser[] | null
    user: IUser | null
    token: string
    authorized: null
    message: null
    registerUser: (user: IUser) => void
    logInUser: (user: IUser) => void
    authUser: () => void
}

interface IJob {
    id?: number;
    createdBy?: string;
    position: string;
    company: string;
    description: string;
    createdAt: string;
    location: string;
    type: string;
}

type JobContextType = {
    jobs?: IJob[] | null,
    job?: IJob | null,
    createJob?: (job: IJob) => void
}