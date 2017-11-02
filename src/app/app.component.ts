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
  activeCat: string;

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
        } else {
          this.activeCat = '';
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

  addTag(emoji: any, tag: any) {
    emoji.tags.push(tag.value);
    tag.value = '';
    this.saveEmojis();
  }

  removeTag(emoji: any, tag: any) {
    const i = emoji.tags.indexOf(tag);
    if (i !== -1) {
      emoji.tags.splice(i, 1);
    }
    this.saveEmojis();
  }

  deleteEmoji(emoji) {
    const r = prompt('If you are sure what you are doing, then type "DELETE" here and press ok');
    if (r === 'DELETE') {
      const i = this.emojis.indexOf(emoji);
      if (i !== -1) {
        this.emojis.splice(i, 1);
      }
    }
    this.saveEmojis();
  }

  saveEmojis() {
    this.emojiService.saveEmojis(this.emojis)
      .subscribe(r => {
        console.log(r);
      }, err => {
        alert(err);
      });
  }
}
