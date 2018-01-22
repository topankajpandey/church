import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallCreatePage } from './wall-create';

@NgModule({
  declarations: [
    WallCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(WallCreatePage),
  ],
})
export class WallCreatePageModule {}
