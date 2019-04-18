export class User {
    uid: string;
    email: string;
    username: string;
    password: string;
    status: string;

    constructor(uid: string, email: string, username: string, password: string, status: string) {
        this.uid = uid;
        this.email = email;
        this.username = username;
        this.password = password;
        this.status = status;
    }
}
