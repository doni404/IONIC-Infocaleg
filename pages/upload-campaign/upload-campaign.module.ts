import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadCampaignPage } from './upload-campaign';

@NgModule({
  declarations: [
    UploadCampaignPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadCampaignPage),
  ],
})
export class UploadCampaignPageModule {}
