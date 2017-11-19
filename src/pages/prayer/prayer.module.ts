import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerPage } from './prayer';

@NgModule({
  declarations: [
    PrayerPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerPage),
  ],
})
export class PrayerPageModule {}
