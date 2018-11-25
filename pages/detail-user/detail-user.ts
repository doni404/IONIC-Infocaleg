import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the DetailUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUserPage');
  }

  goToNotification() {
    this.navCtrl.push(NotificationPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
