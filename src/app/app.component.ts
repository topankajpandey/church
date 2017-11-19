import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BiblePage } from '../pages/bible/bible';
import { SermonsPage } from '../pages/sermons/sermons';
import { UsersPage } from '../pages/users/users';
import { PrayerPage } from '../pages/prayer/prayer';
import { ContactPage } from '../pages/contact/contact';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) navChild:Nav;
  rootPage:any = TabsPage;
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

  }

  main_navigation(){
    this.pages = [
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

