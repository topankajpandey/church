import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

@Injectable()
export class InternetServiceProvider {
  public online = false;
  constructor(public platform: Platform, private network: Network) {

  }

  is_connect() {
    if(this.platform.is('android') || this.platform.is('ios')){
      this.platform.ready().then(() => {
        let type = this.network.type;
        if(type == "unknown" || type == "none" || type == undefined){
          this.online = false;
        }else{
          this.online = true;
        }
      });

      this.network.onDisconnect().subscribe( () => {
        this.online = false;
      });
      this.network.onConnect().subscribe( () => {
        this.online = true;
      });
    }else{
      this.online = true;
    }
    return this.online;
  }

}
