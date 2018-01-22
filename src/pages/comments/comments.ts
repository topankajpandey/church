import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, ModalController, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';
import { WallPage } from '../wall/wall';


@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  public comment_form: FormGroup;
  public comment_data =  {'comment':''};
  public user:any;
  public loading:any;
  public limit = 10;
  public page = 1;
  public data: any;
  public success = 200;
  public unauthorized = 401;
  public notfound = 404;
  public comments: any;
  public check_comment_written = 0;
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {
    this.menu.enable(true);
    this.user = JSON.parse(localStorage.getItem('user_data'));

    this.comment_form = this.formdata.group({
      comment: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('I am comment model comment.ts');
    this.get_comments();
  }

  loadMoreComment(){
    if(this.internet.is_connect()){
      this.showLoader();
      setTimeout(() => {
        let post_id = this.navParams.get('post_id');
        let api_params = {user_id:this.user.id, token:this.user.token, post_id: post_id, page: this.page, limit: this.limit};
        this.common_service.get(api_params, 'posts/get_comments').then((result) => {
            this.loading.dismiss();
            this.data = result;
            if(this.data.response==this.unauthorized){
              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            }else{

              if(this.data.comments.length > 0){
                this.page = this.page + 1;
                for (var index = 0; index < this.data.comments.length; index++) {
                  this.comments.push(this.data.comments[index]);
                }
              }else{
                $(".refresher_load").remove();
                this.presentToast('No more comment available...');
              }
            }
        }, (err) => {
          this.loading.dismiss();
          this.presentToast('Something wrong. Please try later');
        });
      }, 2000);
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }

  postComments(){
    this.check_comment_written = 1;
    if(this.internet.is_connect()){
      let post_id = this.navParams.get('post_id');
      let form_comment = {user_id:this.user.id, token:this.user.token, post_id:post_id, comment: this.comment_data.comment};
      var comment_html = '<div class="message left"><img alt="" (click)="profile('+this.user.id+', '+this.user.username+', '+this.user.photo+')" class="user-img" src="'+this.user.photo+'"><div class="msg-detail"><div class="msg-content"><span class="triangle"></span><p class="line-breaker ">'+this.comment_form.value.comment+'</p></div><div class="msg-info"><p>by '+this.user.username+'</p></div></div></div>';
      $(".comment_section").append(comment_html);
      this.comment_form.reset();
      this.common_service.get(form_comment, 'posts/comment').then((result) => {

      }, (err) => {
        this.presentToast('Something wrong. Please try later');
      });
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }

  get_comments(){
    let post_id = this.navParams.get('post_id');
    console.log("post_id="+ post_id);
    let api_params = {user_id:this.user.id, token:this.user.token, post_id: post_id, page: this.page, limit: this.limit};
    this.common_service.get(api_params, 'posts/get_comments').then((result) => {
        this.data = result;
        if(this.data.response==this.unauthorized){
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.page = this.page + 1;
          this.comments = this.data.comments;
        }
    }, (err) => {
      this.presentToast('Something wrong. Please try later');
    });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
    if(this.check_comment_written > 0){
      //this.navCtrl.push(WallPage);
      //window.location.reload();
      this.check_comment_written = 0;
    }
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: ''
    });
    this.loading.present();
  }

}
