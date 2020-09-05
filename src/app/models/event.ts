import { User } from './user'

export class Event {
    _id: string;
    user = new User();
    title: string;
    body: string;
    date: Date;
    open: boolean;
}
