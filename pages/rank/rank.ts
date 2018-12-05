import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  apiUrl = 'http://18.182.255.183/api';

  token: any;
  penggunaId: any;
  tabActive = "caleg";
  tabCaleg = "aiCenter tab active";
  tabPengguna = "aiCenter tab";
  rankCaleg: any;
  rankPengguna: any;
  sort = "favorit";
  isChangeSort = false;
  response: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPage');

    this.storage.get('token').then(token => {
      this.storage.get('id').then(id => {
        this.token = token;
        this.penggunaId = id;

        this.getAllRank(this.tabActive, this.sort, this.token);
      });
    });
  }

  getAllRank(userRole, sort, token) {
    this.restProvider.getAllRank(userRole, sort, this.token)
      .then(data => {
        this.response = data;

        if (userRole == "pengguna") {
          this.rankPengguna = this.response.data;
          console.log("rank pengguna");
        }else if (userRole == "caleg") {
          this.rankCaleg = this.response.data;
          console.log("rank caleg");
        }

      });
  }

  setActiveTab(page) {
    if (page == "caleg") {
      this.tabActive = "caleg";
      this.tabCaleg = "aiCenter tab active";
      this.tabPengguna = "aiCenter tab";

      this.getAllRank(this.tabActive, this.sort, this.token);
    } else if (page == "pengguna") {
      this.tabActive = "pengguna";
      this.tabCaleg = "aiCenter tab";
      this.tabPengguna = "aiCenter tab active";

      this.getAllRank(this.tabActive, "populer", this.token);
    }
  }

  toggleSort() {
    if (this.tabActive == "caleg") {
      if (this.isChangeSort) {
        this.isChangeSort = false;
      } else {
        this.isChangeSort = true;
      }
    } 
  }

  changeSort(type) {
    this.isChangeSort = false;
    this.sort = type;

    if (this.tabActive == "pengguna") {
      this.getAllRank(this.tabActive, "populer", this.token);
    }else {
      this.getAllRank(this.tabActive, this.sort, this.token);
    }
  }

}
