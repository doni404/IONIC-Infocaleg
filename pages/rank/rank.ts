import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NotificationPage } from '../notification/notification';
import { DetailOtherUserPage } from '../detail-other-user/detail-other-user';

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

  notification: any;
  notification_total: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankPage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(pengguna => {
        this.token = token;
        this.penggunaId = pengguna.id;

        this.getAllRank(this.tabActive, this.sort, this.token);
        this.getNotification(this.penggunaId, this.token);
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

  getNotification(idPengguna, token) {
    this.restProvider.getNotification(idPengguna, token)
      .then(data => {
        this.response = data;

        this.notification_total = this.response.total_new;
        this.notification = this.response.data;
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

  goToDetailCaleg(caleg, rank) {
    // this.restProvider.findCalegByPengguna(pengguna.id, this.token)
    //   .then(data => {
    //     this.response = data;

    //     if (this.response.status == "success") {
    //       this.app.getRootNav().push(DetailOtherUserPage, {caleg: this.response.data[0], role: "caleg", rank: rank});
    //     }

    //   });
    this.app.getRootNav().push(DetailOtherUserPage, {caleg: caleg, role: "caleg", rank: rank});
  }

  goToDetailPengguna(pengguna, rank) {
    console.log("iki : " + rank);
    this.app.getRootNav().push(DetailOtherUserPage, {pengguna: pengguna, role: "pengguna", rank: rank});
  }

  goToNotification() {
    this.app.getRootNav().push(NotificationPage, {notification: this.notification});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getAllRank(this.tabActive, this.sort, this.token);
    this.getNotification(this.penggunaId, this.token);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
