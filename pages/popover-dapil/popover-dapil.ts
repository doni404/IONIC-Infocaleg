import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PopoverDapilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-dapil',
  templateUrl: 'popover-dapil.html',
})
export class PopoverDapilPage {

  token: any;
  response: any;
  dapilList: any;

  constructor(
    public navCtrl: NavController, 
    private storage: Storage,
    public restProvider: RestProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverDapilPage');

    this.storage.get('token').then(token => {
      this.token = token;

      this.restProvider.getAllDapil(this.token)
      .then(data => {
        this.response = data;
        this.dapilList = this.response.data;
      });
    });
  }

  setDapil(index) {
    this.viewCtrl.dismiss(this.dapilList[index]);
  }
}
