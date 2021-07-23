import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NotifyService} from '../notify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  contentType: any;
  constructor(public baseService: BaseService,
              private router: Router,
              private notify: NotifyService,
              private modalService: NzModalService) {
    baseService.currentContent.subscribe(u => {
      this.contentType = u;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: this.contentType
    });

    return next.handle(request).pipe(
      map(event => {
        return event;
      })
    );
  }
}
