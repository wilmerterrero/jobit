import { createContext } from 'react';

const authContext = createContext<UserContextType | null>(null);

export default authContext;