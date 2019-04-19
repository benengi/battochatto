import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  welcomeMessage: string;
  pigMode = false;
  settings = false;
  pigMessage = 'pig mode enabled';

  constructor(private chatService: ChatService) {
    this.welcomeMessage = chatService.welcome();
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  togglePigMode() {
    this.pigMode = !this.pigMode;
    this.chatService.pigLatin = !this.chatService.pigLatin;
  }

  toggleSettings() {
    this.settings = !this.settings;
  }

}
