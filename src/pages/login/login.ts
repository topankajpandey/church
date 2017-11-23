import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams) {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
