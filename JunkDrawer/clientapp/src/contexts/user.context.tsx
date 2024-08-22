import {createContext, useEffect, useState} from "react";
import {UserApi} from "../apis/user.api.ts";
import {IUser} from "../interfaces/user.interface.ts";

export const UserContext = createContext<IUser|undefined>(undefined);

export const UserWrapper = ({children}: any) => {
    const [currentUser, setCurrentUser] = useState<IUser>();

    useEffect(() => {
        //TODO remove hardcoded email, find a way to get it off api
        UserApi.getUserIdByEmail("samantha.calaio@insight.com").then(userId => {
            UserApi.getUserById(userId).then(user => {
                setCurrentUser(user);
            })
        })
    }, [])

    return (
        <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
    )
}

