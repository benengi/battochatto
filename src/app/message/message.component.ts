import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, DoCheck {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  username: string;
  message: string;
  timeStamp: string;
  isOwnMessage: boolean;
  ownEmail: string;
  nightMode = false;
  systemMessage: boolean;
  versionMessage: boolean;
  react = false;
  reaction: string;
  profanityFilter: boolean;

  constructor(
    private authService: AuthService,
    private storeServe: StorageService
    ) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.profanityFilter = this.storeServe.profanity;
    if (this.profanityFilter) {
      this.filterMe(chatMessage.message);
    } else {
      this.message = chatMessage.message;
    }
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
    this.systemMessage = chatMessage.username === 'Chatto Bot';
    this.versionMessage =
      chatMessage.username === 'Batto Bot' &&
      !!chatMessage.message.match('version');
  }

  ngDoCheck() {
    this.profanityFilter = this.storeServe.profanity;
    if (this.profanityFilter) {
      this.filterMe(this.chatMessage.message);
    } else {
      this.message = this.chatMessage.message;
    }
  }

  filterMe(msg: string) {
    let newMsg = msg;
    const eff = new RegExp(/fuck/gmi);
    const unt = new RegExp(/cunt/gmi);
    const ack = new RegExp(/cack/gmi);
    const iss = new RegExp(/ piss/gmi);
    const ock = new RegExp(/c[0o]ck/gmi);
    const ucker = new RegExp(/c[o0]cksucker/gmi);
    const it = new RegExp(/shit/gmi);
    const as = new RegExp(/ ?ass ?/gmi);
    const ick = new RegExp(/ ?dick/gmi);
    const pick = new RegExp(/ ?prick/gmi);
    const its = new RegExp(/ ?tits/gmi);
    const ay = new RegExp(/gay/gmi);
    const derek = new RegExp(/derek/gmi);
    const dirty = new RegExp(/dirty/gmi);
    newMsg = newMsg.replace(eff, 'luv');
    newMsg = newMsg.replace(unt, '._.');
    newMsg = newMsg.replace(ack, 'poo');
    newMsg = newMsg.replace(iss, ' whizz');
    newMsg = newMsg.replace(ucker, 'friend');
    newMsg = newMsg.replace(it, 'dookie');
    newMsg = newMsg.replace(as, ' booty ');
    newMsg = newMsg.replace(ick, ' magnum dong');
    newMsg = newMsg.replace(pick, ' Sgt Johnson');
    newMsg = newMsg.replace(its, ' ( o Y o )');
    newMsg = newMsg.replace(ay, 'non-heteronormative');
    newMsg = newMsg.replace(derek, 'nerd');
    newMsg = newMsg.replace(dirty, 'lovely');
    newMsg = newMsg.replace(ock, 'sausage');
    this.message = newMsg;
  }

  addReaction() {
    this.react = !this.react;
    if (this.react) {
      this.reaction = '♥';
    } else {
      this.reaction = '';
    }
  }
}
