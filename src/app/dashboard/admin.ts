export interface Admin {
    fullName?: string;
    user_name: string;
    password: string;
    contact_number?:string,
    role?:string,
    active_status?:boolean,
    create_at?:string
}
