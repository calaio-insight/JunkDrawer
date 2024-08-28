import {createContext, useEffect, useState} from "react";
import {UserApi} from "../apis/user.api.ts";
import {IGoogleProfile, IGoogleUser, IUser} from "../interfaces/user.interface.ts";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

export interface IUserWrapper {
    currentUser: IUser | undefined;
    login: () => void;
    logout: () => void;
}

export const UserContext = createContext<IUserWrapper|undefined>(undefined);

export const UserWrapper = ({children}: any) => {
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [googleUser, setGoogleUser] = useState<IGoogleUser|undefined>();
    const [googleProfile, setGoogleProfile] = useState<IGoogleProfile|undefined>();

    const login = useGoogleLogin({
        onSuccess: (response) => setGoogleUser(response),
        onError: (error) => console.log('Login Failed: ', error)
    });

    const logout = () => {
        googleLogout();
        setGoogleProfile(undefined);
        setGoogleUser(undefined);
        setCurrentUser(undefined);
    };

    const getUser = (userId: number) => {
        //Get full user object with userId
        UserApi.getUserById(userId).then(user => {
            setCurrentUser(user);
        })
    }

    useEffect(() => {
        if (googleUser) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleUser.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setGoogleProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [googleUser])

    useEffect(() => {
        if (googleProfile){
            //Attempt to get user from DB and set currentUser
            UserApi.getUserByEmail(googleProfile.email).then(user => {
                //If they are a new user to app
                if (user == null || user == ""){
                    //Create user
                    const newUser: IUser = {
                        email: googleProfile.email,
                        firstName: googleProfile.given_name,
                        lastName: googleProfile.family_name,
                        displayName: googleProfile.name,
                        photoUrl: googleProfile.picture
                    }
                    UserApi.createUser(newUser).then(userId => {
                        getUser(userId);
                    });
                } 
                else{
                    setCurrentUser(user);
                }
            });
        }        
    }, [googleProfile]);
    
    const userWrapperData = {
        currentUser,
        login,
        logout
    }
    
    return (
        <UserContext.Provider value={userWrapperData}>{children}</UserContext.Provider>
    )
}

