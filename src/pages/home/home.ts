import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

	chat(){
	 this.navCtrl.setRoot(ChatPage);
  }
}