import { FbLoginRequest } from './facebook.login.request';

export interface SocialLoginRequest{

    provider: string,
    googleAuthToken?: string,

    facebookRequest?:FbLoginRequest

}