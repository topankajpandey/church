import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiblePage } from './bible';

@NgModule({
  declarations: [
    BiblePage,
  ],
  imports: [
    IonicPageModule.forChild(BiblePage),
  ],
})
export class BiblePageModule {}
