import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { CryptoService } from '../crypto.service';
import { formatDate } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
const moment =  _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crypto-create',
  templateUrl: './crypto-create.component.html',
  styleUrls: ['./crypto-create.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CryptoCreateComponent   {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  date = new FormControl( {value: moment(), disabled: true});


  constructor(public cryptoService: CryptoService, private authService: AuthService) {}

  onAddPost(form: NgForm) {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    if (form.invalid) {
      return;
    }
    this.cryptoService.addPost(form.value.cTicker, form.value.cName , form.value.cPrice, form.value.cDate );
    form.resetForm();
  }
}

