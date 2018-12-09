import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  response: any;
  registrationCredentials = { name: '', username: '', password: '', email: ''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToLoginPage() {
    this.navCtrl.pop();
  }

  register() {
    if (this.registrationCredentials.name == '' || this.registrationCredentials.username == '' || this.registrationCredentials.password == '' || this.registrationCredentials.email == '') {
      this.showInfo('Semua kolom harus di isi!');
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Mohon tunggu..."
    });
    loader.present();

    this.restProvider.register(this.registrationCredentials.name,this.registrationCredentials.username,this.registrationCredentials.password,this.registrationCredentials.email)
      .then(data => {
        this.response = data;

        if(this.response.status == 'success'){

          loader.dismiss();
          this.showInfo('Registrasi sukses!');
          this.navCtrl.pop();
        }else{
          loader.dismiss();
          this.showInfo('Registrasi gagal, silahkan cek kolom!');
        }
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
