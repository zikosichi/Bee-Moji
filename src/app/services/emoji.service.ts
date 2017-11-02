import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmojiService {

  constructor(
    private http: HttpClient
  ) { }

  getEmojis(): Observable<any> {
    return this.http.get('/api/emojis')
      .map((res) => {
        return res;
      });
  }

  saveEmojis(emojis: any[]): Observable<any> {
    return this.http.post('/api/emojis', emojis)
      .map((res) => {
        return res;
      });
  }

}
