import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  private getTimeStamp(): string {
    const now = new Date();
    const stamp =
      now.getUTCMonth() +
      1 +
      '/' +
      now.getUTCDate() +
      '/' +
      now.getUTCFullYear() +
      ' ' +
      now.getHours() +
      ':' +
      now.getMinutes() +
      ':' +
      now.getSeconds();
    return stamp + '';
  }

  private getTimeOfDay(): number {
    const now = new Date();
    return now.getHours();
  }

  private addNumbers(num1, num2): any {
    return +num1 + +num2;
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  send() {
    const timeStamp = this.getTimeStamp();
    const message = this.message;
    let dir: any; // Directive argument for chat bot

    if (!!message.match('^!bbot util patch$')) {
      this.chatService.updateNotification(timeStamp);
      this.message = 'Success!';
      return;
    } else if (!!message.match('^!bbot util cc$')) {
      this.chatService.clearChat(timeStamp);
      this.message = 'Success!';
      return;
    } else if (!!message.match('^!secret biggopiggo$')) {
      this.chatService.secretPig = true;
      this.message = 'Pig mode unlocked!';
      return;
    } else if (!!message.match('^!cb')) {
      if (!!message.match('[Hh][ae]llo') || !!message.match('[Hh][ie]y?')) {
        dir = this.getTimeOfDay();
        this.chatService.sendMessage(message, timeStamp);
        this.chatService.cbotChat(1,  dir, timeStamp);
        this.message = '';
        return;
      } else if (!!message.match('add')) {
        const msgArr = message.split(' ');
        const num1 = msgArr[2];
        const num2 = msgArr[3];
        dir = this.addNumbers(num1, num2);
        this.chatService.sendMessage(message, timeStamp);
        this.chatService.cbotChat(2, dir, timeStamp);
        this.message = '';
      } // Add new chat bot responses here
    } else {
      this.chatService.sendMessage(message, timeStamp);
      this.message = '';
    }
  }
}
