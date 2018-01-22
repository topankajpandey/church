import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, Platform, ActionSheetController, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { WallPage } from '../wall/wall';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-wall-create',
  templateUrl: 'wall-create.html',
})
export class WallCreatePage {

  public wall_form: FormGroup;
  public loading: any;
  public online = false;
  public data: any;
  public user_id: Number;
  public base64Image: any;
  public user: any;
  public wall_data =  {'content':''};
  public success = 200;
  public unauthorized = 401;
  public platform_width:any;
  public notfound = 403;
  public failed = 404;
  public media_session: any;
  public selected_file:any;
  public video_selected = false;
  public key_string = '';
  imageURI:any;
  imageFileName:any;

  constructor(private transfer: FileTransfer, private file: File, public actionSheetCtrl: ActionSheetController, public events: Events, private cam: Camera,  public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user_data'));
    this.wall_form = this.formdata.group({
      content: ['', [Validators.required]]
    });
    this.platform_width =  window.screen.width;

  }

  ionViewDidLoad() {
    console.log("I am wall-create.ts");
  }


  wallCreate(){

    this.wall_data['user_id'] = this.user.id;
    this.wall_data['token'] = this.user.token;
    this.wall_data['key_string'] = localStorage.getItem('key_string');
    this.wall_data['media'] = localStorage.getItem('media_session');
      this.showLoader();
      this.common_service.get(this.wall_data, 'posts/create').then((result) => {
      this.data = result
      console.log(result);
      if(this.data){
        this.loading.dismiss();
        if(this.data.response==403){
          this.presentToast(this.data.ack);
        }else{
          localStorage.removeItem('media_session');
          localStorage.removeItem('key_string');
          this.presentToast(this.data.ack);
          this.navCtrl.setRoot(WallPage);
        }
      }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast('Something wrong. Please try later');
    });
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  changeListener(event){

    let myFile  = event.target.files[0];
    console.log(myFile);
    if(myFile.type=='video/mp4'){
      $(".video_container").show();
      this.video_selected = true;
      var $source = $('#video_here');
      $source[0].src = URL.createObjectURL(myFile);
      $source.parent()[0].load();
    }else{
      var filePath  = URL.createObjectURL(myFile);
      $('#uploadPreview img').attr('src',filePath);
      $("#uploadPreview").show();
    }
    localStorage.setItem('key_string', this.makeid());
    var formData = new FormData();
    formData.append('file', myFile);
    formData.append('key_string', localStorage.getItem('key_string'));
    this.showLoader();
    $.ajax({
      url: 'http://www.profliebuilder.com/church/api/posts/temp_data/',
      data: formData,
      type: 'POST',
      contentType: false,
      processData: false,
      success: (data) => {
        let res = JSON.parse(data);
        this.loading.dismiss();
      }
    });
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
            this.getFiles();
            //this.camera('PHOTOLIBRARY');
          }
        }
      ]
    });
    actionSheet.present();
  }



  getFiles(){
    document.getElementById('my_file').click();
  }

  camera(type){
    let sourceType;
    if(type=='CAMERA'){
      sourceType = this.cam.PictureSourceType.CAMERA
    }else{
      this.uploadFile();
      //sourceType = this.cam.MediaType.ALLMEDIA;
      //sourceType = this.cam.PictureSourceType.PHOTOLIBRARY
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
    this.cam.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
       localStorage.setItem('media_session',imageData);
     }, (err) => {
        this.presentToast('Request cancel...');
     });

  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
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

