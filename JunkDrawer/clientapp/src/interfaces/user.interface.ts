
export interface IUser {
    userId?: number;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoUrl: string;
    createdDate?: Date;
}

export interface IGoogleUser {
    access_token: string;
}

export interface IGoogleProfile {
    email: string;
    family_name: string; //last name
    given_name: string; //first name
    id: number; 
    name: string; //displayName
    picture: string;
    verified_email: boolean;
}