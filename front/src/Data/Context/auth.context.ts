import { createContext, createElement, useContext, useState } from "react";

export type UserAuth = {
    id: number,
    role: number
}

interface AuthContextProps {

    UserAuth: UserAuth | null,
    isAuthenticated: boolean,
    isLoading: boolean
    setUserAuthenticated: (user: UserAuth) => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [UserAuth, setUserAuth] = useState<UserAuth | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setUserAuthenticated = (user: UserAuth)=>{
        if(!user){
            setUserAuth(null)
            setIsAuthenticated(false)
            return
        }
        setUserAuth(user)
        setIsAuthenticated(true)
    }

    return createElement(
        AuthContext.Provider,
        {
            value: {
                UserAuth,
                isAuthenticated,
                isLoading,
                setUserAuthenticated
            }
        },
        children
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

        if (!context) throw new Error('useAuth on AuthProvider');

    return context
}