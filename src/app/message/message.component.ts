import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
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

  constructor(private authService: AuthService) {
      authService.authUser().subscribe(user => {
        this.ownEmail = user.email;
        this.isOwnMessage = this.ownEmail === this.userEmail;
      });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.message = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
    this.systemMessage = chatMessage.username === 'Chatto Bot';
    this.versionMessage = (chatMessage.username === 'Batto Bot' && !!chatMessage.message.match('version'));
  }
}
