import { BaseModel } from './base.model';

export interface User extends BaseModel{
    username: string
    password: string
    firstName: string
    google_auth_id: string
    profilePicture: string
    phoneNumber: string
}