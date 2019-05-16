import { Time } from '@angular/common';

export interface Vendor {
    restarunt_name: string,
    restarunt_address: string,
    restarunt_type: string,
    restarunt_id: string,
    restarunt_contact_number: string,
    restarunt_email: String,
    restarunt_description: String,
    restarunt_opening_time:Time,
    restarunt_closing_time:Time,
    user_name: string,
    password: string
}