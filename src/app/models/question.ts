import { User } from './user';
import { Reply } from './reply';

export class Question {
    _id: number;
    user = new User();
    title: string;
    body: string;
    date: Date;
    open: boolean;
    replys: Reply[];
}
