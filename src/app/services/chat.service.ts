import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  user: firebase.User;
  chatMessages: any;
  chatMessage: ChatMessage;
  username: Observable<string>;
  pigLatin = false;
  secretPig = false;
  nightMode = false;

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

  ngOnInit() {
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
    const timeSent = this.getTimeStamp();
    const email = this.user.email;
    const username = this.afAuth.auth.currentUser.displayName;

    if (message.match('^authlvl2 clear chat$')) {
      this.clearChat(timeSent);
      return;
    } else if (message.match('^I love pigs$')) {
      this.secretPig = true;
      return;
    } else {
    // Shhh, it's a secret
    message = this.pigLatinEnable(message);

    this.db.database.ref('/chats').push({
      timeSent,
      email,
      message,
      username
    });
  }
  }

  private clearChat(timeSent) {
    this.db.database.ref('/chats').set({
      '-0system': {
      timeSent,
      email: 'battobot@bchat.com',
      message: 'Chat log has been cleared.',
      username: 'system'
    }});
  }

  private pigLatinEnable(message: string) {
    if (this.pigLatin) {
      const newMessage = message.split(' ');
      for (let i = 0; i < newMessage.length; i++) {
        if (newMessage[i].length > 2) {
          if (newMessage[i].substr(0).match('^[aeiou]')) {
            newMessage[i] = newMessage[i].concat('ay');
          } else if (!newMessage[i].substring(0).match('^[aeiou]')) {
            const firstCon = newMessage[i].charAt(0);
            newMessage[i] = newMessage[i].slice(1, newMessage[i].length);
            newMessage[i] = newMessage[i].concat(firstCon);
          }
        }
      }
      for (let i = 0; i < newMessage.length; i++) {
        newMessage[i] += 'ay';
      }
      message = newMessage.join(' ');
    }
    return message;
  }

  getMessages(): any {
    // query to create message feed binding
    const path = '/chats';
    return this.db.list(path);
  }

  getTimeStamp() {
    const now = new Date();
    const stamp =
      (now.getUTCMonth() + 1) + '/'
      + now.getUTCDate() + '/'
      + now.getUTCFullYear() + ' '
      + now.getHours() + ':'
      + now.getMinutes() + ':'
      + now.getSeconds();
    return stamp + '';
  }

  welcome(): string {
    return 'V0.8 - What\'s new?';
  }

  public checkSecretPig() {
    return this.secretPig;
  }
}
