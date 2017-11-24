import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ToastController, AlertController, LoadingController, NavController, MenuController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login_form: FormGroup;
  loading: any;
  public login_data: any={'username':'', 'password':''};
  
 
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController, public formdata: FormBuilder, public menu: MenuController, public navParams: NavParams) {
    this.check_auth();
    this.menu.enable(false);

    this.login_form = this.formdata.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  check_auth(){
    if(localStorage.getItem('user_data')) {
      this.navCtrl.setRoot(HomePage);
    }
  } 

  login(){

    var user_data = {
        username:this.login_data.username,
        email:this.login_data.username+'@gmail.com',
        contact:'7696409438'
    };
    this.menu.enable(true); 
    localStorage.setItem('user_data', JSON.stringify(user_data));
    this.navCtrl.push(HomePage);
  }

}
