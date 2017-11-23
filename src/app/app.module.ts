import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
=======
import { TabsPage } from '../pages/tabs/tabs';

>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BiblePage } from '../pages/bible/bible';
import { SermonsPage } from '../pages/sermons/sermons';
import { UsersPage } from '../pages/users/users';
import { PrayerPage } from '../pages/prayer/prayer';
import { ContactPage } from '../pages/contact/contact';
<<<<<<< HEAD
import { ChatPage } from '../pages/chat/chat';
import { ChattingPage } from '../pages/chatting/chatting';
=======


>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    LoginPage,
=======
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
    HomePage,
    AboutPage,
    BiblePage,
    SermonsPage,
    UsersPage,
    PrayerPage,
    ContactPage,
<<<<<<< HEAD
	ChatPage,
	ChattingPage
=======

    TabsPage
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    LoginPage,
=======
    TabsPage,
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
    HomePage,
    AboutPage,
    BiblePage,
    SermonsPage,
    UsersPage,
    PrayerPage,
<<<<<<< HEAD
    ContactPage,
	  ChattingPage,
  	ChatPage
=======
    ContactPage
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
