export interface IUser {
    id: number
    name: string
    email: string
    phone: string
    photo: string
    position: string
    position_id: string
    registration_timestamp: string
}

export interface IUsersResponse {
    users: IUser[]
    total_pages: number
}