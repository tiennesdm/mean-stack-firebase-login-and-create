import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import {  CryptoForm } from './crypto.model';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private posts: CryptoForm[] = [];
  private postsUpdated = new Subject<CryptoForm[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: CryptoForm[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(cName: string, cTicker: string, cPrice: number, cDate: Date) {
    const crypto: CryptoForm = { id: null, cName: cName, cTicker: cTicker, cPrice: cPrice , cDate: cDate};
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', crypto)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(crypto);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
