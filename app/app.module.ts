import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';
import { CommentPage } from '../pages/comment/comment';
import { PopoverDapilPage } from '../pages/popover-dapil/popover-dapil';
import { PopoverPartaiPage } from '../pages/popover-partai/popover-partai';
import { PopoverLainPage } from '../pages/popover-lain/popover-lain';
import { UploadCampaignPage } from '../pages/upload-campaign/upload-campaign';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    RegisterPage,
    NotificationPage,
    CommentPage,
    PopoverDapilPage,
    PopoverPartaiPage,
    PopoverLainPage,
    UploadCampaignPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    RegisterPage,
    NotificationPage,
    CommentPage,
    PopoverDapilPage,
    PopoverPartaiPage,
    PopoverLainPage,
    UploadCampaignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
