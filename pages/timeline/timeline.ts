import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import moment from 'moment';

import { NotificationPage } from '../notification/notification';
import { CommentPage } from '../comment/comment';
import { UploadCampaignPage } from '../upload-campaign/upload-campaign';
import { DetailOtherUserPage } from '../detail-other-user/detail-other-user';

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  apiUrl = 'http://18.182.255.183/api';

  token: any;
  role: any;
  penggunaId: any;
  profileImage: any;
  profileName: any;
  response: any;
  timelines: any;
  sort = "new";
  isChangeSort = false;

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
    console.log('ionViewDidLoad TimelinePage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(pengguna => {
        this.token = token;
        this.role = pengguna.role;
        this.penggunaId = pengguna.id;
        this.profileImage = pengguna.gambar;
        this.profileName = pengguna.nama;

        console.log(this.token);

        this.getAllTimeline(this.sort);
        this.getNotification(this.penggunaId, this.token);
      });
    });
  }

  ionViewWillEnter() {
    this.getAllTimeline(this.sort);
    this.getNotification(this.penggunaId, this.token);
  }

  getAllTimeline(sort) {
    this.restProvider.getAllTimeline(this.penggunaId, sort, this.token)
      .then(data => {
        this.response = data;
        this.timelines = this.response.data;

        this.timelines.forEach(function (value) {
          console.log(value.deskripsi_kampanye + "\n");

          //check posting time until now
          var now = moment(new Date());
          var create_date = moment(value.created_at);

          var duration = moment.duration(create_date.diff(now));
          var hours = duration.asHours() + 6;

          value.lama_posting = Math.abs(Math.floor(hours));

          if (value.pengguna_like == true) {
            value.like_icon = "../../assets/imgs/icon/thumb-up-active.png";
          } else {
            value.like_icon = "../../assets/imgs/icon/thumb-up-inactive.png";
          }

          if (value.pengguna_dislike == true) {
            value.dislike_icon = "../../assets/imgs/icon/thumb-down-active.png"
          } else {
            value.dislike_icon = "../../assets/imgs/icon/thumb-down-inactive.png"
          }

          console.log("total jam : " + hours);
        });
      });
  }

  likeCampaign(idKampanye, idPengguna, token, index) {
    this.restProvider.likeCampaign(idKampanye, idPengguna, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          if (this.response.action == "delete") {
            console.log("berhasil di delete");
            this.timelines[index].pengguna_like = false;
            this.timelines[index].total_like -= 1;
            this.timelines[index].like_icon = "../../assets/imgs/icon/thumb-up-inactive.png";
          } else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.timelines[index].pengguna_like = true;
            this.timelines[index].total_like += 1;
            this.timelines[index].like_icon = "../../assets/imgs/icon/thumb-up-active.png";

            // Disable dislike when disliked
            if (this.timelines[index].pengguna_dislike) {
              this.dislikeCampaign(idKampanye, idPengguna, token, index);
            }
          }
        } else {
          console.log("gagal");
        }
      });
  }

  dislikeCampaign(idKampanye, idPengguna, token, index) {
    this.restProvider.dislikeCampaign(idKampanye, idPengguna, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          if (this.response.action == "delete") {
            console.log("berhasil di delete");
            this.timelines[index].pengguna_dislike = false;
            this.timelines[index].dislike_icon = "../../assets/imgs/icon/thumb-down-inactive.png";
          } else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.timelines[index].pengguna_dislike = true;
            this.timelines[index].dislike_icon = "../../assets/imgs/icon/thumb-down-active.png"

            // Disable dislike when disliked
            if (this.timelines[index].pengguna_like) {
              this.likeCampaign(idKampanye, idPengguna, token, index);
            }
          }
        } else {
          console.log("gagal");
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

  toggleSort() {
    if (this.isChangeSort) {
      this.isChangeSort = false;
    } else {
      this.isChangeSort = true;
    }
  }

  changeSort(type) {
    this.isChangeSort = false;
    this.sort = type;
    this.getAllTimeline(this.sort);
  }

  // goToDetailCaleg(caleg) {
  //   this.app.getRootNav().push(DetailOtherUserPage, { caleg: caleg, role: "caleg" });
  // }

  goToDetailCaleg(idPengguna) {
    console.log("id : " + idPengguna);
    this.restProvider.findCalegByPengguna(idPengguna, this.token)
      .then(data => {
        this.response = data;

        console.log("data : " + this.response.data[0].id);

        if (this.response.status == "success") {
          this.app.getRootNav().push(DetailOtherUserPage, {caleg: this.response.data[0], role: "caleg"});
        }

      });
    // this.app.getRootNav().push(DetailOtherUserPage, {caleg: caleg, role: "caleg", rank: rank});
  }

  goToCampaignUpload() {
    this.app.getRootNav().push(UploadCampaignPage);
  }

  goToComment(idKampanye, deskripsiKampanye, namaPengguna, gambarPengguna) {
    // This to hide tabs on CommentPage
    this.app.getRootNav().push(CommentPage, {
      idKampanye: idKampanye,
      deskripsiKampanye: deskripsiKampanye,
      namaPengguna: namaPengguna,
      gambarPengguna: gambarPengguna
    });
  }

  goToNotification() {
    // this.navCtrl.push(NotificationPage);
    this.app.getRootNav().push(NotificationPage, { notification: this.notification });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getAllTimeline(this.sort);
    this.getNotification(this.penggunaId, this.token);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
