type Roles = "admin" | "client" | "moderator";

interface IUser { 
    id?: number;
    username?: string;
    email: string;
    password: string;
    signedIn?: Date;
    profilePic?: string;
    role?: Roles;
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
    message?: null,
    jobs?: IJob[] | null,
    job?: IJob | null,
    createJob?: (job: IJob) => void
}