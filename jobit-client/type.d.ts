type Roles = "admin" | "client" | "moderator";
type Categories = "design" | "programming" | "cloud";

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
    logOutUser: () => void
    authUser: () => void
}

interface IJob {
    id?: number;
    position: string;
    company: string;
    description: string;
    createdAt: string;
    location: string;
    categories: Categories | string;
    type: string;
}

type JobContextType = {
    message?: null,
    jobs?: IJob[] | null,
    job?: IJob | null,
    getJobs?: () => void,
    createJob?: (job: IJob) => void
}