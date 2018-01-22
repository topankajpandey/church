import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
//import { TabsPage } from '../pages/tabs/tabs';
import { UsersPage } from '../pages/users/users';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BiblePage } from '../pages/bible/bible';
import { SermonsPage } from '../pages/sermons/sermons';
import { PrayersPage } from '../pages/prayers/prayers';
import { WallPage } from '../pages/wall/wall';
import { EventsPage } from '../pages/events/events';
import { ContactPage } from '../pages/contact/contact';
import { ChatPage } from '../pages/chat/chat';
import { ChattingPage } from '../pages/chatting/chatting';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { CommonServiceProvider } from '../providers/common-service/common-service';

//import { MenuController } from 'ionic-angular/components/app/menu-controller';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages = [];
  public user_id =  '';
  public username =  '';
  public user_photo =  '';
  public home_page = 'Home';
  public about_page = 'About';
  public bible_page = 'Bible';
  public sermons_page = 'Sermons';
  public prayers_page = 'Request Prayer';
  public wall_page = 'Wall';
  public events_page = 'Events';
  public contact_page = 'Contact';
  public auth = {};
  public app_id = '024acb75-f802-46e4-aa93-adc01c4e8b9a';
  public project_id = '280166991020';
  constructor(public _SplashScreen: SplashScreen, public platform: Platform, public common_service: CommonServiceProvider, public oneSignal: OneSignal, private diagnostic: Diagnostic, public menuCtrl: MenuController,  public events: Events, public statusBar: StatusBar, public splashScreen: SplashScreen) {

      this.initializeApp();

      this.main_navigation();

      events.subscribe('user:update', (id, user, photo) => {
        this.user_id = id;
        this.username = user;
        this.user_photo = photo;
      });

  }

  main_navigation(){
    this.pages = [
      {'color': '#E63135', 'icon': 'ios-easel', title: this.wall_page, component: WallPage },
      {'color': '#E63135', 'icon': 'ios-easel', title: this.events_page, component: EventsPage },
      {'color': '#E63135', 'icon': 'ios-book', title: this.bible_page, component: BiblePage },
      {'color': '#E63135', 'icon': 'md-rose', title: this.sermons_page, component: SermonsPage },
      {'color': '#E63135', 'icon': 'md-mail', title: this.prayers_page, component: PrayersPage },

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      setTimeout(() => {
        this._SplashScreen.hide();
      }, 100);

      if (this.platform.is('android') || this.platform.is('ios')) {
        this.diagnostic.requestCameraAuthorization();
      }

      if (this.platform.is('android')){
        this.push_notification_android();
      }



    });
  }


  push_notification_android(){

    this.oneSignal.startInit(this.app_id, this.project_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      //this.nav.setRoot(SignupPage);
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      this.nav.setRoot(WallPage);
    });

    this.oneSignal.endInit();

}

  openPage(page) {
    this.nav.setRoot(page.component);
  }


  my_profile(user_id, name, pic){
      this.nav.push(UsersPage,{
        user_id :user_id,
        name: name,
        pic: pic
      });
  }

  logout(){
    console.log("bye bye takecare! See you soon.");
    localStorage.clear();
    this.menuCtrl.enable(false);
    this.nav.setRoot(LoginPage);
  }


}

