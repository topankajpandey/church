import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { WallPage } from '../wall/wall';
import { OneSignal } from '@ionic-native/onesignal';
import { RegisterPage } from '../register/register';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login_form: FormGroup;
  public loading: any;
  public data: any;
  public player_id:any;
  public online = false;
  public login_data =  {'id':'', 'username':'', 'password':''};

  constructor(public oneSignal: OneSignal, public navCtrl: NavController, public platform: Platform, private network: Network, public auth_service: AuthServiceProvider,  public events: Events, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public formdata: FormBuilder, public menu: MenuController, public navParams: NavParams) {
    this.check_auth();
    this.menu.enable(false);

    this.login_form = this.formdata.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });

    if (this.platform.is('android')) {
      this.oneSignal.getIds().then((result) => {
        this.player_id = result.userId;
      });
    }

  }

  ionViewDidLoad() {
    if(this.platform.is('android') || this.platform.is('ios')){
      this.platform.ready().then(() => {
        let type = this.network.type;

        if(type == "unknown" || type == "none" || type == undefined){
          this.online = false;
        }else{
          this.online = true;
        }
      });

      this.network.onDisconnect().subscribe( () => {
        this.online = false;
      });
      this.network.onConnect().subscribe( () => {
        this.online = true;
      });
    }else{
      this.online = true;
    }

  }

  /* Check for already exist sessional data */
  check_auth(){
    if(localStorage.getItem('user_data')) {
      this.data = JSON.parse(localStorage.getItem('user_data'));
      this.publish_events(this.data.id, this.data.username, this.data.photo);
      this.menu.enable(true);
      this.navCtrl.push(WallPage);
    }
  }

  /* Application login*/
  login(){
    if(this.online){
      this.showLoader();
      this.login_data['player_id'] = this.player_id;
      this.auth_service.login(this.login_data).then((result) => {
        this.data = result
        if(this.data){
          this.loading.dismiss();
          if(this.data.response==401){
            this.presentToast(this.data.ack);
          }else if (this.data.response==404){
            this.presentToast(this.data.ack);
          }else{
            this.menu.enable(true);
            this.publish_events(this.data.user_detail.id, this.login_data.username, this.data.user_detail.photo);
            localStorage.setItem('user_data', JSON.stringify(this.data.user_detail));
            this.navCtrl.setRoot(WallPage);
          }
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast('Something wrong. Please try later');
      });
    }else{
      this.presentToast('Oops! Network is not available...');
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  /* Pubslish event on each update */
  publish_events(id, username, photo){
    this.events.publish(
      'user:update',
      id,
      username,
      photo,
    );
  }

  alertForLocator(title, text, button) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [button]
    });
    alert.present();
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
