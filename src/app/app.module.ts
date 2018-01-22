
import { Http ,HttpModule} from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OneSignal } from '@ionic-native/onesignal';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/* import { FileChooser } from '@ionic-native/file-chooser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FilePath } from '@ionic-native/file-path';
import { FileOpener } from '@ionic-native/file-opener'; */
//import { TabsPage } from '../pages/tabs/tabs';

//import { IonicAudioModule } from 'ionic-audio';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BiblePage } from '../pages/bible/bible';
import { SermonsPage } from '../pages/sermons/sermons';
import { PrayersPage } from '../pages/prayers/prayers';
import { UsersPage } from '../pages/users/users';
import { WallPage } from '../pages/wall/wall';
import { EventsPage } from '../pages/events/events';
import { ViewEventPage } from '../pages/events/view-event';
import { WallCreatePage } from '../pages/wall-create/wall-create';
import { CommentsPage } from '../pages/comments/comments';
import { ContactPage } from '../pages/contact/contact';
import { ChatPage } from '../pages/chat/chat';
import { ChattingPage } from '../pages/chatting/chatting';
import { EditprofilePage } from '../pages/editprofile/editprofile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { InternetServiceProvider } from '../providers/internet-service/internet-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    BiblePage,
    SermonsPage,
    PrayersPage,
    UsersPage,
    WallPage,
    EventsPage,
    ViewEventPage,
    WallCreatePage,
    CommentsPage,
    ContactPage,
    ChatPage,
    ChattingPage,
  	EditprofilePage,
    //TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    //IonicAudioModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    BiblePage,
    SermonsPage,
    PrayersPage,
    UsersPage,
    WallPage,
    EventsPage,
    ViewEventPage,
    WallCreatePage,
    CommentsPage,
    ContactPage,
    ChattingPage,
    ChatPage,
	  EditprofilePage
    //TabsPage,

  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    Camera,
    OneSignal,
    Diagnostic,
    InAppBrowser,
    SplashScreen,

    /*FileOpener,
    DocumentViewer,
    FileOpener,
    FilePath, */
    AuthServiceProvider,
    PostServiceProvider,
    CommonServiceProvider,
    InternetServiceProvider,
    FileTransfer,
    File
  ]
})
export class AppModule {}
