import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform, AlertController, App } from 'ionic-angular';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { NotificationPage } from '../notification/notification';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {
  apiUrl = 'http://18.182.255.183/api';

  token: any;
  penggunaId: any;
  profileImage: any;
  profileName: any;
  totalComment: any;
  totalCommentLike: any;
  totalCommentDislike: any;
  comments: any
  isEdit = false;
  loader: any;
  response: any;

  notification: any;
  notification_total: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage,
    public restProvider: RestProvider,
    private file: File,
    private platform: Platform,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUserPage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(pengguna => {
        this.token = token;
        this.penggunaId = pengguna.id;
        this.profileName = pengguna.nama;
        this.totalComment = pengguna.total_comment;
        this.totalCommentLike = pengguna.total_comment_like;
        this.totalCommentDislike = pengguna.total_comment_dislike;

        if (pengguna.gambar != null) {
          this.profileImage = this.apiUrl + "/getprofile/" + pengguna.gambar + "?token=" + token;
        } else {
          this.profileImage = "../../assets/imgs/logo.png";
        }

        console.log(this.token);
        this.getAllCommentByUser(this.penggunaId);
        this.getNotification(this.penggunaId, this.token);
      });
    });

  }

  getAllCommentByUser(penggunaId) {
    this.restProvider.getAllCommentByUser(this.penggunaId, this.token)
      .then(data => {
        this.response = data;
        this.comments = this.response.data;
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

  openEdit() {
    this.isEdit = true;
  }

  edit() {
    this.isEdit = false;
    this.restProvider.editProfile(this.profileName, this.penggunaId, this.token)
      .then(data => {
        this.response = data;
        if (this.response.status == "success") {
          this.showInfo('Terima Kasih!');
        } else {
          this.showInfo('Ubah nama gagal!');
        }
      });
  }

  getImage(sourceType: number) {
    let loader = this.loadingCtrl.create({
      content: "Silahkan pilih gambar ..."
    });
    loader.present();

    const options: CameraOptions = {
      quality: 10,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      console.log("image path :" + imageData);

      let fileName = imageData.split('/').pop();
      let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
      let correctFileName;

      if (this.platform.is('android')) {
        correctFileName = fileName.substring(0, fileName.lastIndexOf("?"));
      }
      if (this.platform.is('ios')) {
        correctFileName = fileName;
      }

      console.log("path :" + path);
      console.log("filename :" + correctFileName);

      this.file.readAsDataURL(path, correctFileName)
        .then(base64File => {
          this.storage.get('token').then(dataToken => {
            this.token = dataToken;
          });

          this.profileImage = base64File;
          loader.dismiss();

          // update profile
          this.uploadProfile(this.profileImage, this.token);
        })
        .catch(() => {
          console.log('Error reading file');
          loader.dismiss();
        })
    }, (err) => {
      console.log(err);
      this.presentToast(err);
      loader.dismiss();
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  uploadProfile(image, token) {
    // show loading screen
    this.loader = this.loadingCtrl.create({
      content: "Sedang menggunggah..."
    });
    this.loader.present();

    //send image data
    let url = this.apiUrl + '/changeprofileimage?token=' + token;
    console.log();
    var options: FileUploadOptions = {
      fileKey: 'image',

      fileName: image,
      chunkedMode: false,
      httpMethod: 'put',
      mimeType: 'multipart/form-data',
      params: {
        'image': image,
        'id_pengguna': this.penggunaId
      }
    }

    const FileTransfer = this.transfer.create();

    FileTransfer.upload(image, url, options);

    FileTransfer.onProgress((progressEvent) => {
      var progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      // this.progress = perc;
      console.log("progress : " + progress);
      if (progress >= 99) {
        this.loader.dismiss();

        // this.navCtrl.pop();
        this.showInfo('Ubah gambar profil berhasil!');
      }
    });

  }

  goToNotification() {
    this.app.getRootNav().push(NotificationPage, {notification: this.notification});
  }

  goBack() {
    this.navCtrl.pop();
  }

  logout() {
    this.storage.remove('pengguna');
    this.storage.remove('token');
    this.storage.set('isLogin', "false");

    this.app.getRootNav().push(LoginPage);
    this.app.getRootNav().setRoot(LoginPage);
  }

  showGetImageOption() {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Pilih cara untuk pilih foto',
      buttons: [
        {
          text: 'Galeri',
          handler: () => {
            this.getImage(0);
          }
        },
        {
          text: 'Kamera',
          handler: () => {
            this.getImage(1);
          }
        }
      ]
    });
    alert.present();
  }

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: 'Terima Kasih !',
      subTitle: "",
      buttons: ['Tutup']
    });
    alert.present();
  }

}
