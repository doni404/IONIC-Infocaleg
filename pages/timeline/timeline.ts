import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import moment from 'moment';

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
  penggunaId: any;
  profileImage: any;
  profileName: any;
  response: any;
  timelines: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');

    this.storage.get('token').then(token => {
      this.storage.get('gambar').then(gambar => {
        this.storage.get('id').then(id => {
          this.storage.get('nama').then(nama => {
            this.token = token;
            this.penggunaId = id;
            this.profileImage = gambar;
            this.profileName = nama;

            console.log(this.token);

            this.restProvider.getAllTimeline(this.penggunaId, "new", this.token)
              .then(data => {
                this.response = data;
                this.timelines = this.response.data;

                this.timelines.forEach(function (value) {
                  console.log(value.deskripsi_kampanye + "\n");

                  //check posting time until now
                  var now = moment(new Date());
                  var create_date = moment(value.created_at);

                  var duration = moment.duration(create_date.diff(now));
                  var hours = duration.asHours();

                  value.lama_posting = Math.floor(hours);

                  if (value.pengguna_like == true) {
                    value.like_icon = "../../assets/imgs/icon/thumb-up-active.png";
                  }else {
                    value.like_icon = "../../assets/imgs/icon/thumb-up-inactive.png";
                  }

                  if (value.pengguna_dislike == true) {
                    value.dislike_icon = "../../assets/imgs/icon/thumb-down-active.png"
                  }else {
                    value.dislike_icon = "../../assets/imgs/icon/thumb-down-inactive.png"
                  }

                  console.log("total jam : " + hours);
                });
              });
          });
        });
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
            this.timelines[index].total_like -= 1;
            this.timelines[index].like_icon = "../../assets/imgs/icon/thumb-up-inactive.png";
          }else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.timelines[index].total_like += 1;
            this.timelines[index].like_icon = "../../assets/imgs/icon/thumb-up-active.png";
          }
        }else {
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
            this.timelines[index].dislike_icon = "../../assets/imgs/icon/thumb-down-inactive.png";
          }else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.timelines[index].dislike_icon = "../../assets/imgs/icon/thumb-down-active.png"
          }
        }else {
          console.log("gagal");
        }
      });
  }

  goToNotification() {
    this.navCtrl.push(NotificationPage);
  }
}
