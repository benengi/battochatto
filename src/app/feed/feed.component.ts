import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireList } from 'angularfire2/database';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: AngularFireList<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.feed = this.chatService.getMessages();
  }

  ngOnChanges() {
    this.feed = this.chatService.getMessages();
  }
}
