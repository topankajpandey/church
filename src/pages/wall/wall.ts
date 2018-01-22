import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, ModalController, Platform, Events, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { ChatPage} from '../../pages/chat/chat';
import { UsersPage } from './../users/users';
import { CommentsPage } from './../comments/comments';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { InternetServiceProvider } from '../../providers/internet-service/internet-service';
import { LoginPage } from '../login/login';
import { WallCreatePage } from '../wall-create/wall-create';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-wall',
  templateUrl: 'wall.html',
})
export class WallPage {

  public comment_form: FormGroup;
  public comment_data =  [];
  public loading: any;
  public data: any;
  public online = false;
  public posts:any;
  public post_data = {};
  public user:any;
  public likedata:any;
  public platform_width:any;
  public success = 200;
  public unauthorized = 401;
  public notfound = 404;
  public limit = 10;
  public page = 1;
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public internet: InternetServiceProvider, public common_service: CommonServiceProvider, public navCtrl: NavController, public formdata: FormBuilder, public platform: Platform, private network: Network, public post_service: PostServiceProvider,   public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public menu: MenuController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user_data'));
    this.menu.enable(true);

    this.comment_form = this.formdata.group({
      comment: ['', [Validators.required]],
      //post_id: ['', [Validators.required]]
    });

    $('.video-player').hover(function toggleControls() {
      this.removeAttribute("controls")
   })

  }

  wallCreate(){
    this.navCtrl.push(WallCreatePage)
  }


  ionViewDidLoad() {
    this.platform_width =  window.screen.width;
    $(window).scroll(function() {
      console.log("scrolled");
      $('video').each(function(){
          if ($(this).visible( true )) {
              console.log('visible');
          } else {
            console.log('invisible');
          }
      })
    });
    this.get_post();
  }

  loadMorePost(refresher){
    if(this.internet.is_connect()){
      setTimeout(() => {
        this.post_data = {user_id:this.user.id, token:this.user.token, page: this.page, limit: this.limit};
        this.post_service.get_post(this.post_data).then((result) => {
            this.loading.dismiss();
            this.data = result
            if(this.data.response==this.unauthorized){
              localStorage.clear();
              this.navCtrl.setRoot(LoginPage);
            }else{
              this.page = this.page + 1;
              for (var index = 0; index < this.data.post_detail.length; index++) {
                this.posts.push(this.data.post_detail[index]);
              }
            }
        }, (err) => {
          this.loading.dismiss();
          this.presentToast('Something wrong. Please try later');
        });
        refresher.complete();
      }, 2000);
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }


  likes(post_id, status:false){

    let rel = $('#thumb_changer_'+post_id).attr('rel');
    let total_likes =  $('.post_like_'+post_id).html();
    if(rel=='like'){
      let count = parseInt(total_likes) + 1;
      $('.post_like_'+post_id).html(count);
      $('#thumb_changer_'+post_id).attr('class', 'icon icon-md ion-md-thumbs-up');
      $('#thumb_changer_'+post_id).attr('rel', 'unlike');
    }else{
      if(total_likes > 0){
        let count = parseInt(total_likes) - 1;
        $('.post_like_'+post_id).html(count);
      }
      $('#thumb_changer_'+post_id).attr('class', 'icon icon-md ion-ios-thumbs-up-outline');
      $('#thumb_changer_'+post_id).attr('rel', 'like');
    }
    if(this.internet.is_connect()){
      let post_data = {user_id:this.user.id, token:this.user.token, post_id: post_id, type: rel};
      this.common_service.get(post_data, 'posts/like').then((result) =>{
        this.likedata = result;
        if(this.likedata.response==404){
          this.presentToast(this.likedata.ack);
        }
      }, (err) => {
        this.presentToast('Something wrong. Please try later');
      });
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }

  comments_modal(post_id){

    let commentModal = this.modalCtrl.create(CommentsPage, { post_id: post_id });
    commentModal.onDidDismiss(data => {
      console.log(data);
    });
    commentModal.present();
  }


  comments(post_id, total_comment){

      let total = total_comment + 1;
      $('.total_comment_'+post_id).html(total);
      let form_comment = {user_id:this.user.id, token:this.user.token, post_id:post_id, comment: this.comment_form.value.comment};
      var comment_html = '<div class="message left"><img alt="" (click)="profile('+this.user.id+', '+this.user.username+', '+this.user.photo+')" class="user-img" src="'+this.user.photo+'"><div class="msg-detail"><div class="msg-content"><span class="triangle"></span><p class="line-breaker ">'+this.comment_form.value.comment+'</p></div><div class="msg-info"><p>by '+this.user.username+'</p></div></div></div>';
      $(".comment_section_"+post_id).append(comment_html);
      this.comment_form.reset();
      this.post_service.comment(form_comment).then((result) => {
      }, (err) => {
        this.presentToast('Something wrong. Please try later');
      });

  }

  get_post(){
      this.showLoader();
      this.post_data = {user_id:this.user.id, token:this.user.token, page: this.page, limit: this.limit};
      this.post_service.get_post(this.post_data).then((result) => {
          this.loading.dismiss();
          this.data = result
          if(this.data.response==this.unauthorized){
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }else{
            this.page = this.page + 1;
            this.posts = this.data.post_detail;
            console.log(this.posts);
          }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast('Something wrong. Please try later');
      });
  }

  profile(user_id, name, pic){
    if(this.internet.is_connect()){
      this.navCtrl.push(UsersPage,{
        user_id :user_id,
        name: name,
        pic: pic
      });
    }else{
      this.presentToast('Oh shit. I have lost internet connection');
    }
  }

  chat(){
    this.navCtrl.push(ChatPage);
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
