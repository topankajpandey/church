import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { WallPage } from '../wall/wall';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { CommonServiceProvider } from '../../providers/common-service/common-service';

@IonicPage()
@Component({
  selector: 'page-prayers',
  templateUrl: 'prayers.html',
})
export class PrayersPage {

  public prayer_form: FormGroup;
  public loading: any;
  public data: any;
  public prayer_for_conditions = false;
  public user:any;
  public prayer_data =  {prayer_for:'', prayer_for_value:''};

  constructor(public common_service: CommonServiceProvider, public internet: InternetServiceProvider, public navCtrl: NavController, public platform: Platform, private network: Network, public auth_service: AuthServiceProvider,  public events: Events, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public formdata: FormBuilder, public menu: MenuController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user_data'));
    this.prayer_form = this.formdata.group({
      name: ['', [Validators.required]],
      prayer_for: ['', [Validators.required]],
      prayer_for_value: [''],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

  }

  ionViewDidLoad() {

  }

  prayer_selection(ev){
    console.log('for', ev);
    if(ev=='Other'){
      this.prayer_for_conditions = true;
      console.log(this.prayer_form.get('prayer_for_value'));
      //this.prayer_form.get('prayer_for_value').setValidators([Validators.required]);
    }else{
      this.prayer_for_conditions = false;
      //this.prayer_form.get('prayer_for_value').setValidators([]);
    }
  }


  request(){
    if(this.internet.is_connect()){

      if(this.prayer_data.prayer_for=='Other' && (this.prayer_data.prayer_for_value==null || this.prayer_data.prayer_for_value=='') ){
        this.presentToast('Prayer for name is required');
      }else{
        this.showLoader();
        this.prayer_data['user_id'] = this.user.id;
        this.prayer_data['token'] = this.user.token;
        this.common_service.get(this.prayer_data, 'prayers/request').then((result) => {
          this.data = result
          if(this.data){
            this.loading.dismiss();
            if(this.data.response==403){
              this.presentToast(this.data.ack);
            }else{
              this.presentToast(this.data.ack);
              setTimeout(() => {
                this.navCtrl.setRoot(WallPage);
              }, 3000);
            }
          }
        }, (err) => {
          this.loading.dismiss();
          this.presentToast('Something wrong. Please try later');
        });
      }
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
