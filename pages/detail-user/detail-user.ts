import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

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

  token: any;
  penggunaId: any;
  profileImage: any;
  profileName: any;
  isEdit = false;
  response: any;

  constructor(
    public navCtrl: NavController, 
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUserPage');

    this.storage.get('token').then(token => {
      this.storage.get('gambar').then(gambar => {
        this.storage.get('id').then(id => {
          this.storage.get('nama').then(nama => {
            this.token = token;
            this.penggunaId = id;
            this.profileImage = gambar;
            this.profileName = nama;

            console.log(this.token);
          });
        });
      });
    });
  }

  openEdit() {
    this.isEdit = true;
  }

  edit() {
    this.isEdit = false;
    this.restProvider.editProfile(this.profileName,this.penggunaId,this.token)
      .then(data => {
        this.response = data;
          if (this.response.status == "success") {
            this.showInfo('Ubah profil berhasil!');
          }else {
            this.showInfo('Ubah profil gagal!');
          }
      });
  }

  goToNotification() {
    this.navCtrl.push(NotificationPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: text,
      buttons: ['Tutup']
    });
    alert.present();
  }

}
