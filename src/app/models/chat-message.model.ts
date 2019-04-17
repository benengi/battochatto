export class ChatMessage {
    $key?: string;
    email?: string;
    username?: string;
    message?: string;
    timeSent?: string;

    constructor(key: string, email: string, username: string, message: string, timeSent: string) {
        this.$key = key;
        this.email = email;
        this.username = username;
        this.message = message;
        this.timeSent = timeSent;
    }
}
