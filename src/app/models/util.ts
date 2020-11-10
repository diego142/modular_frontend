import { User } from './user';

export class Util {

    public static setStorageUser(user: User) {
        localStorage.setItem('user_info', JSON.stringify(user));
    }

    public static getStorageUser(): User {
        const user = JSON.parse(localStorage.getItem('user_info'));
        if (user) {
            return user;
        } else {
            return new User();
        }
    }

    public static removeStorageUser() {
        localStorage.removeItem('user_info');
    }




}
