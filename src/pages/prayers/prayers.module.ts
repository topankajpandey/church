import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayersPage } from './prayers';

@NgModule({
  declarations: [
    PrayersPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayersPage),
  ],
})
export class PrayersPageModule {}
