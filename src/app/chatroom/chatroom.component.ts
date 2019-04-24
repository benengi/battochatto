import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  welcomeMessage: string;
  pigMode = false;
  pigSecret = false;
  nightMode = false;
  settings = false;
  pigMessage = 'pig mode enabled';
  headerGlow = true;

  constructor(
    private chatService: ChatService,
    private storeServe: StorageService
    ) {
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
    this.chatService.pigLatin = this.pigMode;
  }

  toggleNightMode() {
    this.nightMode = !this.nightMode;
    this.chatService.nightMode = this.nightMode;
  }

  toggleHeaderGlow() {
    this.headerGlow = !this.headerGlow;
    this.storeServe.toggleHeaderGlow(this.headerGlow);
  }

  toggleSettings() {
    this.pigSecret = this.chatService.checkSecretPig();
    this.settings = !this.settings;
  }
}
