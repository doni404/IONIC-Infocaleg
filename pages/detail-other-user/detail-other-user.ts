import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the DetailOtherUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-other-user',
  templateUrl: 'detail-other-user.html',
})
export class DetailOtherUserPage {

  apiUrl = 'http://18.182.255.183/api';

  token: any;
  penggunaId: any;
  caleg: any;
  pengguna: any;
  profileImage: any;
  profileName: any;
  tabActive = "aktifitas";
  tabDapil = "aiCenter tab active";
  tabPartai = "aiCenter tab";
  tabNomor = "aiCenter tab";
  role = "caleg";
  rate = 0;
  response: any;
  styleDetail: any;
  rank: any;

  totalPosting: any;
  totalCommentLike: any;
  totalCommentDislike: any;
  totalComment: any;

  notification: any;
  notification_total: any;

  comments = [
    // {nama_pengguna:"Doni Putra Purbawa", komentar:"sumatera"},
    // {nama_pengguna:"Doni Putra Purbawa", komentar:"kalimantan"},
    // {nama_pengguna:"Doni Putra Purbawa", komentar:"jawa"},
    // {nama_pengguna:"Doni Putra Purbawa", komentar:"sulawesi"}
  ];

  constructor(
    public app: App,
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    public restProvider: RestProvider
  ) {
    this.role = navParams.get("role");
    this.rank = navParams.get("rank");

    // console.log("rank : " + this.rank);

    if (this.role == "caleg") {
      this.caleg = navParams.get("caleg");
      this.profileName = this.caleg.nama_lengkap;
      this.profileImage = this.caleg.link_gambar;
      this.totalPosting = this.caleg.total_posting;
      this.totalCommentLike = this.caleg.total_posting_like;
      this.totalCommentDislike = this.caleg.total_posting_dislike;
      this.totalComment = this.caleg.total_comment;
    }else if (this.role == "pengguna") {
      this.pengguna = navParams.get("pengguna");
      this.profileName = this.pengguna.nama;
      this.profileImage = this.pengguna.gambar;
      this.totalPosting = this.pengguna.total_posting;
      this.totalCommentLike = this.pengguna.total_comment_like;
      this.totalCommentDislike = this.pengguna.total_comment_dislike;
      this.totalComment = this.pengguna.total_comment;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailOtherUserPage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(penggunaLoggedIn => {
        this.token = token;
        this.penggunaId = penggunaLoggedIn.id;

        if (this.role == "caleg") {
          this.getRateCaleg(this.caleg.id, this.penggunaId, this.token);
          this.styleDetail = "detail-activity-caleg";
        }else if (this.role == "pengguna") {
          this.styleDetail = "detail-activity-pengguna";
          if (this.profileImage != null) {
            this.profileImage = this.apiUrl + "/getprofile/" + this.profileImage + "?token=" + this.token;
          }else {
            this.profileImage = "../../assets/imgs/logo.png";
          }
        }

        this.getNotification(this.penggunaId, this.token);
      });
    });
  }

  setActiveTab(page, myEvent) {
    if (page == "aktifitas") {
      this.tabActive = "aktifitas";
      this.tabDapil = "aiCenter tab active";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab";

    } else if (page == "profil") {
      this.tabActive = "profil";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab active";
      this.tabNomor = "aiCenter tab";

    } else if (page == "litsus") {
      this.tabActive = "litsus";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab active";

    }
  }

  getRateCaleg(idCalonLegislatif, idPengguna, token) {
    this.restProvider.getRateCaleg(idCalonLegislatif, idPengguna, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          this.rate = this.response.rate;
        }else {
          this.rate = 0;
        }

        console.log("status : " + this.response.status);
        console.log("rate : " + this.rate);
      });
  }

  rateCaleg(idCalonLegislatif, idPengguna, rate, token) {
    this.restProvider.rateCaleg(idCalonLegislatif, idPengguna, rate, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          this.rate = rate;
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

  goToNotification() {
    this.app.getRootNav().push(NotificationPage, {notification: this.notification});
  }

  goBack() {
    this.navCtrl.pop();
  }

}
