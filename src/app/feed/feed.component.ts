import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any;

  constructor(private chatService: ChatService) {
    chatService.getMessages().valueChanges().subscribe(messages => {
      this.feed = messages;
    });
   }

  ngOnInit() {
  }
}
