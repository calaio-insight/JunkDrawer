import {createContext, useEffect, useState} from "react";
import {UserApi} from "../apis/user.api.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {CredentialResponse, googleLogout} from "@react-oauth/google";

export interface IUserWrapper {
    currentUser: IUser | undefined;
    login: (response: CredentialResponse) => void;
    logout: () => void;
}

export const UserContext = createContext<IUserWrapper|undefined>(undefined);

export const UserWrapper = ({children}: any) => {
    const [currentUser, setCurrentUser] = useState<IUser>();

    const login = (response:CredentialResponse) => {
        UserApi.authenticate(response.credential!).then(user => {
            setCurrentUser(user);            
            localStorage.setItem("jd-token", JSON.stringify(user.jwtToken));
            localStorage.setItem("jd-user-email", JSON.stringify(user.email));
        })
    }
    
    const logout = () => {
        googleLogout();
        setCurrentUser(undefined);
        localStorage.removeItem("jd-token");
        localStorage.removeItem("jd-user-email");
    };
    
    const getUserFromStorage = (userEmail: string) => {
        UserApi.getUserByEmail(userEmail).then (user => {
            if (user != ""){
                setCurrentUser(user);
            }
        });
    }

    useEffect(() => {
        if (!currentUser){
            //Check local storage
            const userEmail = localStorage.getItem("jd-user-email")?.replace(/"/gi, '');
            if (userEmail != "" && userEmail != null){
                getUserFromStorage(userEmail);
            }    
        }
        
    }, [currentUser]);
    
    const userWrapperData = {
        currentUser,
        login,
        logout
    }
    
    return (
        <UserContext.Provider value={userWrapperData}>{children}</UserContext.Provider>
    )
}

