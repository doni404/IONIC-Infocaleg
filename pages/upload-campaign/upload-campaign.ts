import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

/**
 * Generated class for the UploadCampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-campaign',
  templateUrl: 'upload-campaign.html',
})
export class UploadCampaignPage {
  apiUrl = 'http://18.182.255.183/api';

  token: any;
  penggunaId: any;
  deskripsi: any;
  imageCampaign = "../../assets/imgs/icon/thumbnail.png";
  loader: any;

  constructor(
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
    console.log('ionViewDidLoad UploadCampaignPage');

    this.storage.get('token').then(token => {
      this.storage.get('pengguna').then(pengguna => {
        this.token = token;
        this.penggunaId = pengguna.id;
      });
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

          this.imageCampaign = base64File;
          loader.dismiss();
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

  uploadCampaign() {
    // show loading screen
    this.loader = this.loadingCtrl.create({
      content: "Sedang menggunggah..."
    });
    this.loader.present();

    //send image data
    let url = this.apiUrl + '/campaign?token=' + this.token;
    console.log();
    var options: FileUploadOptions = {
      fileKey: 'image',

      fileName: this.imageCampaign,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'multipart/form-data',
      params: {
        'image': this.imageCampaign,
        'id_pengguna': this.penggunaId,
        'deskripsi': this.deskripsi
      }
    }

    const FileTransfer = this.transfer.create();

    FileTransfer.upload(this.imageCampaign, url, options);

    FileTransfer.onProgress((progressEvent) => {
      var progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      // this.progress = perc;
      console.log("progress : " + progress);
      if (progress >= 99) {
        this.loader.dismiss();
        this.showInfo('Kampanye berhasil diunggah!');
        this.goBack();
      }
    });
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
      title: 'Informasi',
      subTitle: text,
      buttons: ['Tutup']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}
