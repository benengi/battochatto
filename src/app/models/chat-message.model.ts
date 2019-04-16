export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent?: string;

    constructor(key: string, email: string, userName: string, message: string, timeSent: string) {
        this.$key = key;
        this.email = email;
        this.userName = userName;
        this.message = message;
        this.timeSent = timeSent;
    }
}
