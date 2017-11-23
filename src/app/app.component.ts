import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) navChild:Nav;
<<<<<<< HEAD
  rootPage:any = LoginPage;
=======
  rootPage:any = TabsPage;
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
  pages: Array<{title: string, component: any}>;
  public home_page = 'Home';
  public about_page = 'About';
  public bible_page = 'Bible';
  public sermons_page = 'Sermons';
  public users_page = 'Profile';
  public prayer_page = 'Prayer Wall';
  public contact_page = 'Contact';
  constructor(public platform: Platform,  public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.main_navigation();
<<<<<<< HEAD
    
=======

>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
  }

  main_navigation(){
    this.pages = [
<<<<<<< HEAD
      { title: this.home_page, component: HomePage },
=======
>>>>>>> 24c968bfa91b64575719c1a9e8653ee76db217e1
      { title: this.bible_page, component: BiblePage },
      { title: this.sermons_page, component: SermonsPage },
      { title: this.prayer_page, component: PrayerPage },
      { title: this.users_page, component: UsersPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }


}

