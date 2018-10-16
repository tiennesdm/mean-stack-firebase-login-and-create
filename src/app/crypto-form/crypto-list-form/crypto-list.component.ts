import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CryptoForm } from '../crypto.model';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent  {
  posts: CryptoForm[] = [];
  private postsSub: Subscription;

  constructor(public cryptoService: CryptoService) {}

}
