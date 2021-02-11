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
    users: IUser[]
    user: IUser
    token: string
    authorized: null
    message: null
    registerUser: (user: IUser) => void
    logInUser: (user: IUser) => void
}