import { createContext } from 'react';

const jobContext = createContext<JobContextType | null>(null);

export default jobContext;