import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any; 
  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(true);
    this.data = JSON.parse(localStorage.getItem('user_data'));
  }

  ionViewDidLoad() {
    console.log('HomePage Loaded');
  }

	chat(){
	 this.navCtrl.push(ChatPage);
	 }
}