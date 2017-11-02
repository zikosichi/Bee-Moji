import { Component, OnInit } from '@angular/core';

// Services
import { EmojiService } from './services/emoji.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  emojis: any[] = [];
  categories: string[] = [];
  activeCat: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private emojiService: EmojiService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        if (params['cat']) {
          this.activeCat = params['cat'];
        }
      });

    this.emojiService.getEmojis().subscribe(res => {
      this.emojis = res;
      this.generateCategories();
    });
  }

  generateCategories() {
    const c = {};
    this.emojis.forEach(e => {
      c[e.category] = true;
    });

    for (const key in c) {
      if (c.hasOwnProperty(key)) {
        this.categories.push(key);
      }
    }
  }
}
