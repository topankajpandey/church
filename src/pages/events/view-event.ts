import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';

@IonicPage()
@Component({
  selector: 'page-view-event',
  templateUrl: 'view-event.html',
})
export class ViewEventPage {
  public loading: any;
  public user:any;
  public data: any;
  public event = {};
  public success = 200;
  public unauthorized = 401;
  public notfound = 404;

  constructor(public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {

    this.user = JSON.parse(localStorage.getItem('user_data'));
    //this.navParams.get('id');
  }




  ngOnInit() {
    this.view_events();
  }

  view_events(){
    this.showLoader();
    let event_id = this.navParams.get('id');
    let post_data = {event_id: event_id, user_id:this.user.id, token:this.user.token};
    this.common_service.get(post_data, 'events/view_event').then((result) => {
        this.loading.dismiss();
        this.data = result
        if(this.data.response==this.unauthorized){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.event = this.data.event;
        }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
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
