import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
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

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  send() {
    const timeStamp = this.getTimeStamp();
    const message = this.message;

    if (message.match('^!bbot util patch$')) {
      this.chatService.updateNotification(timeStamp);
      this.message = 'Success!';
      return;
    } else if (message.match('^!bbot util cc$')) {
      this.chatService.clearChat(timeStamp);
      this.message = 'Success!';
      return;
    } else if (message.match('^!bbot biggopiggo$')) {
      this.chatService.secretPig = true;
      this.message = 'Pig mode unlocked!';
      return;
    } else if (message.match('[hH][ea]llo+ [bBcC]bot') || message.match('[Hh]ey [Bb]atto [Bb]ot?')) {
      this.chatService.sendMessage(message, timeStamp);
      this.chatService.cbotChat(1, timeStamp);
      this.message = '';
      return;
    } else {
    this.chatService.sendMessage(message, timeStamp);
    this.message = '';
    }
  }
}
