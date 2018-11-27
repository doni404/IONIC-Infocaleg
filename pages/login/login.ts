import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any;
  loginCredentials = { username: '', password: '' };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    console.log("logging in...");

    let loader = this.loadingCtrl.create({
      content: "Mohon tunggu..."
    });
    loader.present();

    this.restProvider.login(this.loginCredentials.username,this.loginCredentials.password)
      .then(data => {
        this.user = data;

        this.storage.get('language').then(dataLanguage => {

          if(this.user.status == 'success'){

            loader.dismiss();
            this.showInfo('Login sukses!');

            console.log("token : " + this.user.token);
  
            this.storage.set('token', this.user.token);
            this.storage.set('id', this.user.data[0].id);
            this.storage.set('nama', this.user.data[0].nama);
            this.storage.set('username', this.user.data[0].username);
            this.storage.set('email', this.user.data[0].email);
            this.storage.set('password', this.user.data[0].password);
            this.storage.set('gambar', this.user.data[0].gambar);
            this.storage.set('role', this.user.data[0].role);
            this.storage.set('isLogin', "true");
            this.navCtrl.setRoot(TabsPage);
          }
          else{
            loader.dismiss();
            this.showInfo('Login gagal, silahkan cek username dan password anda!');
          }
        });
    });
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
