import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  public user_form: FormGroup;
  public loading: any;
  public user: any;
  public online = false;
  public data: any;
  public updated_data: any;
  public get_data = [];
  public success = 200;
  public unauthorized = 401;
  public notfound = 403;
  public user_data =  {'email':'', 'password':'', 'first_name':'', 'last_name':''};

  constructor( public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public platform: Platform, private network: Network,  public events: Events, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public formdata: FormBuilder, public menu: MenuController, public navParams: NavParams) {
    this.user_form = this.formdata.group({
      email: [''],
      password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      first_name: [''],
      last_name: ['']
    });
    this.user = JSON.parse(localStorage.getItem('user_data'));
  }

  ionViewDidLoad() {
    if(this.internet.is_connect()){
      this.get_user();
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }



  get_user(){
    this.showLoader();
    let params = {id:this.user.id, user_id:this.user.id, token:this.user.token};
    this.common_service.get(params, 'users/get_user').then((result) => {
        this.loading.dismiss();
        this.data = result;
        if(this.data.response==this.unauthorized || this.data.response==this.notfound){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }
        this.get_data = this.data.user;
        this.user_data =  {
          'email': this.data.user.email,
          'password': '',
          'first_name': this.data.user.first_name,
          'last_name':  this.data.user.last_name,
        };
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }


  update_user(){
    if(this.internet.is_connect()){
      this.showLoader();
      this.user_data['token'] = this.user.token;
      this.user_data['user_id'] = this.user.id;
      console.log(this.user_data);
      this.common_service.get(this.user_data, 'users/save').then((result) => {
        this.updated_data = result
        if(this.updated_data){
          this.loading.dismiss();
          if(this.updated_data.response==401 || this.updated_data.response==404){
            this.presentToast(this.updated_data.ack);
          }else{
            this.presentToast(this.updated_data.ack);
          }
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast('Something wrong. Please try later');
      });
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
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
