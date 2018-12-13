import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  apiUrl = 'http://18.182.255.183/api';

  token: any;
  penggunaId: any;
  notifications: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams) {

      this.notifications = this.navParams.get("notification");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(pengguna => {
        this.token = token;
        this.penggunaId = pengguna.id;

        console.log(this.token);
      });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
