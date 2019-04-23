import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { environment } from 'src/environments/environment';

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
  versionNumber = environment.appVersion;

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

  public sendMessage(message: string, timeSent: string) {
    const email = this.user.email;
    const username = this.afAuth.auth.currentUser.displayName;

    this.db.database.ref('/chats').push({
      timeSent,
      email,
      message,
      username
    });
  }

  public clearChat(timeSent) {
    this.db.database.ref('/chats').set({
      '-0system': {
      timeSent,
      email: 'battobot@bchat.com',
      message: 'Chat log has been cleared.',
      username: 'Batto Bot'
    }});
  }

  public cbotChat(message: number, timeSent: string) {
    let response: string;
    const email = this.user.email;
    const username = this.afAuth.auth.currentUser.displayName;

    if (message === 1) {
      response = 'Hello, ' + username;
    }
    this.db.database.ref('/chats').push({
      timeSent,
      email: 'battobot@bchat.com',
      message: response,
      username: 'Chatto Bot'
    });
  }

  public updateNotification(timeSent: string) {
    this.db.database.ref('/chats').push({
      timeSent,
      email: 'battobot@bchat.com',
      message: 'A new version is available!',
      username: 'Batto Bot'
    });
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

  welcome(): string {
    return 'Ver. ' + this.versionNumber + ' - What\'s new?';
  }

  public checkSecretPig() {
    return this.secretPig;
  }
}
