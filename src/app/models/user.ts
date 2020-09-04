
export class User {

    constructor(name = '', lastname = '', age = 0, code = '', career = '', email = '', password = '', active = true) {
        this.name = name;
        this.lastName = lastname;
        this.age = age;
        this.code = code;
        this.career = career;
        this.email = email;
        this.password = password;
        this.active = active;
    }

    _id: string;
    name: string;
    lastName: string;
    age: number;
    code: string;
    career: string;
    email: string;
    password: string;
    active: boolean;
}
