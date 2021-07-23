import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {HttpinterceptorService} from './shared/httpinterceptor.service';
import {ErrorInterceptService} from './shared/error-intercept.service';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTableModule} from 'ng-zorro-antd/table';
import {MomentModule} from 'ngx-moment';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {CustomValidatorDirective} from './custom-validator.directive';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CustomValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzNotificationModule,
    NzMessageModule,
    NzModalModule,
    NzAvatarModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzCardModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTableModule,
    MomentModule,
    NzDividerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptService, multi: true },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
