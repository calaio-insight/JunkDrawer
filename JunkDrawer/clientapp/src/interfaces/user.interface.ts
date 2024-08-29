
export interface IUser {
    userId?: number;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoUrl: string;
    createdDate?: Date;
    jwtToken?: string;
}

