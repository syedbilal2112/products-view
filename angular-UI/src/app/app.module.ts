// import { CommonService } from './services/common.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoutesModule} from './app.router';
import {AuthGuard} from './security/auth.guard';
import {WindowRefService} from './services/window-ref.service';
import {HmacHttpClient} from './utils/app-token-http-client';
import {Http, XHRBackend, RequestOptions, HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { NotificationComponent } from './components/shared/notification/notification.component';
// import { LoadingBarComponent } from 'components/shared/loading-bar/loading-bar.component';
import { NotificationService } from './components/shared/notification/notification.service';
import { ConfirmationService } from './components/shared/confirmation/confirmation.service';

import { AuthenticationModule } from './components/authentication/authentication.module';
import { HomepageModule } from './components/homepage/homepage.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  return new HmacHttpClient(xhrBackend, requestOptions);
  // return new HmacHttpClient(xhrBackend, requestOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    // ConfirmationComponent,
    NotificationComponent,
    // LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    AuthenticationModule,
    // HomepageModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions],
      multi: false
    },
    AuthGuard,
    WindowRefService,
    NotificationService,
    ConfirmationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}