import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-bible',
  templateUrl: 'bible.html',
})
export class BiblePage {

  public loading: any;
  public user:any;
  public data: any;
  public bibles: any;
  public success = 200;
  public unauthorized = 401;
  public notfound = 404;

  constructor(private iab: InAppBrowser, public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {

    this.user = JSON.parse(localStorage.getItem('user_data'));

  }



  ionViewDidLoad() {
    this.get_bibles();
  }

  get_bibles(){
    this.showLoader();
    let post_data = {user_id:this.user.id, token:this.user.token};
    this.common_service.get(post_data, 'bibles/get_bible').then((result) => {
        this.loading.dismiss();
        this.data = result
        if(this.data.response==this.unauthorized){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.bibles = this.data.bibles;
        }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }

  view_bible_book(bible_book_link){
    /* this.platform.ready().then(() => {
      const browser = this.iab.create(bible_book_link, '_blank', {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'yes',
        closebuttoncaption: 'DONE?'
      });
      console.log(browser);
    }); */
    window.open(bible_book_link,'_system','location=yes');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
