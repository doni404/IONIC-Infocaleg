import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PopoverPartaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-partai',
  templateUrl: 'popover-partai.html',
})
export class PopoverPartaiPage {

  token: any;
  response: any;
  partaiList: any;

  constructor(public navCtrl: NavController, 
    private storage: Storage,
    public restProvider: RestProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams)  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPartaiPage');

    this.storage.get('token').then(token => {
      this.token = token;

      this.restProvider.getAllPartai(this.token)
      .then(data => {
        this.response = data;
        this.partaiList = this.response.data;
      });
    });
  }

  setPartai(partai) {
    this.viewCtrl.dismiss(partai);
  }
}
