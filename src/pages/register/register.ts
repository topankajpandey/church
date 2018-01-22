import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { WallPage } from '../wall/wall';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public register_form: FormGroup;
  public loading: any;
  public online = false;
  public data: any;
  public register_data =  {'username':'', 'email':'', 'password':'', 'confirm_password':'', 'first_name':'', 'last_name':''};

  constructor(public navCtrl: NavController, public platform: Platform, private network: Network, public auth_service: AuthServiceProvider,  public events: Events, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public formdata: FormBuilder, public menu: MenuController, public navParams: NavParams) {
    this.menu.enable(false);

    this.register_form = this.formdata.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      confirm_password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
    });

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

  login(){
    this.navCtrl.push(LoginPage);
  }

  register(){
    if(this.online){
      this.showLoader();
      this.auth_service.register(this.register_data).then((result) => {
        this.data = result
        if(this.data){
          this.loading.dismiss();
          if(this.data.response==403){
            this.presentToast(this.data.ack);
          }else{
            this.presentToast(this.data.ack);
            this.navCtrl.setRoot(LoginPage);
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
