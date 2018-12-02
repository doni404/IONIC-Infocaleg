import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import moment from 'moment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  apiUrl = 'http://18.182.255.183/api';
  // @ViewChild('myInput') myInput: ElementRef;

  token: any;
  idKampanye: any;
  deskripsiKampanye: any;
  namaPenggunaKampanye: any;
  gambarPenggunaKampanye: any;
  idPengguna: any;
  profileImage: any;
  profileName: any;
  response: any;
  comments: any;
  newComment: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public restProvider: RestProvider,
    public navParams: NavParams) {

    this.idKampanye = navParams.get('idKampanye');
    this.deskripsiKampanye = navParams.get('deskripsiKampanye');
    this.namaPenggunaKampanye = navParams.get('namaPengguna');
    this.gambarPenggunaKampanye = navParams.get('gambarPengguna');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');

    this.storage.get('token').then(token => {
      this.storage.get('gambar').then(gambar => {
        this.storage.get('id').then(id => {
          this.storage.get('nama').then(nama => {
            this.token = token;
            this.idPengguna = id;
            this.profileImage = gambar;
            this.profileName = nama;

            console.log(this.token);

            this.getAllCampaignComment();
          });
        });
      });
    });
  }

  getAllCampaignComment() {
    this.restProvider.getAllCampaignComment(this.idKampanye, this.idPengguna, this.token)
      .then(data => {
        this.response = data;
        this.comments = this.response.data;

        this.comments.forEach(function (value) {
          console.log(value + "\n");

          //check posting time until now
          var now = moment(new Date());
          var create_date = moment(value.created_at);

          var duration = moment.duration(create_date.diff(now));
          var hours = duration.asHours();

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

  likeComment(idKomentarKampanye, idPengguna, token, index) {
    this.restProvider.likeComment(idKomentarKampanye, idPengguna, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          if (this.response.action == "delete") {
            console.log("berhasil di delete");
            this.comments[index].pengguna_like = false;
            this.comments[index].total_like -= 1;
            this.comments[index].like_icon = "../../assets/imgs/icon/thumb-up-inactive.png";
          } else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.comments[index].pengguna_like = true;
            this.comments[index].total_like += 1;
            this.comments[index].like_icon = "../../assets/imgs/icon/thumb-up-active.png";
          }
        } else {
          console.log("gagal");
        }
      });
  }

  dislikeComment(idKomentarKampanye, idPengguna, token, index) {
    this.restProvider.dislikeComment(idKomentarKampanye, idPengguna, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          if (this.response.action == "delete") {
            console.log("berhasil di delete");
            this.comments[index].pengguna_dislike = false;
            this.comments[index].total_dislike -= 1;
            this.comments[index].dislike_icon = "../../assets/imgs/icon/thumb-down-inactive.png";
          } else if (this.response.action == "insert") {
            console.log("berhasil di insert");
            this.comments[index].pengguna_dislike = true;
            this.comments[index].total_dislike += 1;
            this.comments[index].dislike_icon = "../../assets/imgs/icon/thumb-down-active.png"
          }
        } else {
          console.log("gagal");
        }
      });
  }

  sendComment(idKampanye, idPengguna, komentar, token) {
    this.restProvider.createComment(idKampanye, idPengguna, komentar, token)
      .then(data => {
        this.response = data;

        if (this.response.status == "success") {
          this.getAllCampaignComment();
          this.newComment = "";
          console.log("berhasil comment");
        } else {
          console.log("gagal comment");
        }
      });
  }

  // resize() {
  //   this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  // }

  goBack() {
    this.navCtrl.pop();
    // this.navCtrl.setRoot(CommentPage);
  }

}
