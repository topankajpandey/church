import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';

import { EditprofilePage } from '../../pages/editprofile/editprofile';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  public name: String;
  public pic: String;
  public user_id: Number;
  public base64Image: String;
  public user: any;
  public get_data = [];
  public loading: any;
  public data: any;
  public online = false;
  public success = 200;
  public unauthorized = 401;
  public notfound = 403;

  constructor(public actionSheetCtrl: ActionSheetController, public events: Events, private cam: Camera,  public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user_data'));
    this.user_id = this.navParams.get('user_id');
    this.name = this.navParams.get('name');
    this.pic = this.navParams.get('pic');
  }

  ionViewDidLoad() {
    if(this.internet.is_connect()){
      this.get_user();
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }

  profileImageAction() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Action',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera('CAMERA');
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.camera('PHOTOLIBRARY');
          }
        }
      ]
    });
    actionSheet.present();
  }

  camera(type){
    let sourceType;
    if(type=='CAMERA'){
      sourceType = this.cam.PictureSourceType.CAMERA
    }else{
      sourceType = this.cam.PictureSourceType.PHOTOLIBRARY
    }
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.cam.DestinationType.DATA_URL,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE,
      sourceType:sourceType,
      targetWidth: 400,
      allowEdit: true,
      correctOrientation: true,
    }
    this.showLoader();
    this.cam.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let params = {id:this.user_id, image:imageData, user_id:this.user.id, token:this.user.token};
        this.common_service.get(params, 'users/save').then((result) => {
          this.loading.dismiss();
          this.data = result;
          if(this.data.response==this.unauthorized || this.data.response==this.notfound){
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }
          this.events.publish('user:update', this.user.id, this.user.username, this.data.photo);
       });
     }, (err) => {
        this.loading.dismiss();
        this.presentToast('Something wrong with request processing...');
     });
  }

  get_user(){
    this.showLoader();
    let params = {id:this.user_id, user_id:this.user.id, token:this.user.token};
    this.common_service.get(params, 'users/get_user').then((result) => {
        this.loading.dismiss();
        this.data = result;
        if(this.data.response==this.unauthorized || this.data.response==this.notfound){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }
        this.get_data = this.data.user;
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }

  report_user(user_id){
    this.showLoader();
    let params = {ban_id: user_id, user_id:this.user.id, token:this.user.token};
    console.log(params);
    this.common_service.get(params, 'users/ban_user').then((result) => {
        this.loading.dismiss();
        this.data = result;
        if(this.data.response==this.unauthorized || this.data.response==this.notfound){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.presentToast('User will be report by admin soon');
        }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }



  editprofile(){
	  this.navCtrl.push(EditprofilePage);
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
