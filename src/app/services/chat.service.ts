import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: any;
  chatMessage: ChatMessage;
  username: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser();
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  public sendMessage(message: string) {
    // TODO make the message db into ARRAY
    const timeSent = this.getTimeStamp();
    const email = this.user.email;
    const username = this.afAuth.auth.currentUser.displayName;
    this.chatMessages = this.getMessages();

    this.db.database.ref('/chats/').push({
        timeSent,
        email,
        message,
        username
    });

    // this.db.list('/chats').valueChanges()
    // .subscribe(u => {
    //   console.log(u);

    // });
  }

  getMessages(): any {
    // query to create message feed binding
    const path = '/chats';
    return this.db.list(path);
    // .valueChanges()
    // .subscribe(v => {
    //   return v;
    // });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1) + '/' +
    now.getUTCDate();
    const time = now.getUTCHours() + ':' +
    now.getUTCMinutes() + ':' +
    now.getUTCSeconds();

    return now + ' ' + time;
  }

  welcome(): string {
    return 'Support Batto Chatto on Patreon!';
  }
}
