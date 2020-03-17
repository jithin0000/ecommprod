export interface RegisterRequest{
    username: string
    password: string
    firstName: string
    googleToken?: string,
    profilePicture?:string,
    facebookToken?:string

}