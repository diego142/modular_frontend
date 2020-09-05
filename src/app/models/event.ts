import { User } from './user'

export class Event {
    _id: string;
    user: string;
    title: string;
    body: string;
    date: Date;
    open: boolean;
}
