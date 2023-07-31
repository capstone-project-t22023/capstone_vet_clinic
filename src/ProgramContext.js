import { createContext } from 'react';


export const ProgramContext = createContext({ 
    user:{}, 
    authenticated: false 
});
export default ProgramContext;