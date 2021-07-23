import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {NotifyService} from '../notify.service';


const baseUrL = 'https://localhost:44335/api/';
// const baseUrL = 'https://kazicare.azurewebsites.net/api/';
//

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  constructor(private router: Router, private httpClient: HttpClient,
              private notify: NotifyService
  ) { }

  private now: any;
  private baseurl = baseUrL;

  private contentSource = new BehaviorSubject<any>({
    'Content-Type': 'application/json'
  });
  currentContent = this.contentSource.asObservable();

  SetContentType(type): void {
    this.contentSource.next(type);
  }

  getBaseUrl(): string {
    return this.baseurl;
  }
}
