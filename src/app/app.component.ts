import { Component, OnInit } from '@angular/core';

// Services
import { EmojiService } from './services/emoji.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private emojiService: EmojiService
  ) { }

  ngOnInit() {
    this.emojiService.getEmojis().subscribe(res => {

    });
  }
}
