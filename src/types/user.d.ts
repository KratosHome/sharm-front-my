interface userType {
    _id: string;
    name: string;
    surname?: string;
    emailVerified: boolean;
    email: string;
    img: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}