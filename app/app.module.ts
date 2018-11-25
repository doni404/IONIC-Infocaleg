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

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    RegisterPage,
    NotificationPage
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
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
