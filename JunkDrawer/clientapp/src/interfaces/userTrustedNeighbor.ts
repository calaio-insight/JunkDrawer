
export interface IUserTrustedNeighbor {
    userTrustedNeighborId?: number;
    userId: number;
    trustedUserId: number;    
    displayName: string;
    photoUrl: string;    
    email?: string;
}