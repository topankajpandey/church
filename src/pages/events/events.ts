import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { LoginPage } from '../login/login';
import { ViewEventPage } from '../events/view-event';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  public loading: any;
  public user:any;
  public data: any;
  public events: any;
  public success = 200;
  public unauthorized = 401;
  public notfound = 404;

  constructor(private iab: InAppBrowser, public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {

    this.user = JSON.parse(localStorage.getItem('user_data'));

  }



  ionViewDidLoad() {
    this.get_events();
  }

  get_events(){
    this.showLoader();
    let post_data = {user_id:this.user.id, token:this.user.token};
    this.common_service.get(post_data, 'events/get_events').then((result) => {
        this.loading.dismiss();
        this.data = result
        if(this.data.response==this.unauthorized){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.events = this.data.events;
        }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }

  view_event(id){
    console.log(id)
    this.navCtrl.push(ViewEventPage, {id:id});
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
