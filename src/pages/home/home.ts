import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(true); 
  }

	chat(){
	 this.navCtrl.setRoot(ChatPage);
	 }
}