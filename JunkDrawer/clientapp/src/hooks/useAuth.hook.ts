import {useContext} from "react";
import {UserContext} from "../contexts/user.context";


export function useAuth() {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;

    return {
        currentUser
    }
}