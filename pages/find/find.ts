import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { PopoverDapilPage } from '../popover-dapil/popover-dapil';
import { PopoverPartaiPage } from '../popover-partai/popover-partai';
import { PopoverLainPage } from '../popover-lain/popover-lain';
import { DetailOtherUserPage } from '../detail-other-user/detail-other-user';

/**
 * Generated class for the FindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {

  apiUrl = 'http://18.182.255.183/api';

  token: any;
  keyword: any;
  tabActive = "dapil";
  tabDapil = "aiCenter tab active";
  tabPartai = "aiCenter tab";
  tabNomor = "aiCenter tab";
  sort = "daerah";
  isChangeSort = false;
  response: any;

  filterDapil = "DAPIL";
  filterPartai = "PARTAI";
  filterLain = "LAINNYA";

  filterDapilId: any;
  filterPartaiId: any;
  filterNomor = "ASC";

  visibleDapil: any;
  visiblePartai: any;
  visibleNomor: any;

  pulauList = [
    {src:"../../assets/imgs/pulau/Sumatra.png", nama:"sumatera"},
    {src:"../../assets/imgs/pulau/Kalimantan.png", nama:"kalimantan"},
    {src:"../../assets/imgs/pulau/Jawa.png", nama:"jawa"},
    {src:"../../assets/imgs/pulau/Sulawesi.png", nama:"sulawesi"},
    {src:"../../assets/imgs/pulau/Bali.png", nama:"bali"},
    {src:"../../assets/imgs/pulau/NusaTenggara.png", nama:"nusa tenggara"},
    {src:"../../assets/imgs/pulau/Maluku.png", nama:"maluku"},
    {src:"../../assets/imgs/pulau/Papua.png", nama:"papua"}
  ];

  partaiList: any;
  calegList: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');

    this.storage.get('token').then(token => {
      this.token = token;
      
      this.getAllPartai();
      this.getAllCaleg();
    });
  }

  showInput() {
    console.log("input : " + this.keyword);
  }
  
  findCaleg(findType, params, value) {
    this.sort = "nama";

    console.log("find type : " + findType);
    console.log("nama partai : " + value);
    
    if (findType == "search") {
      this.restProvider.findCaleg(params, this.token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;
        
        this.filterDapil = "DAPIL";
        this.filterPartai = "PARTAI";
        this.filterLain = "LAINNYA";
      });
    } else if (findType == "island") {
      this.restProvider.findCalegByIsland(params, this.token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;
      });
    } else if (findType == "partai") {
      this.restProvider.findCalegByPartai(params, this.token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;
        this.filterPartai = value;
        this.filterPartaiId = params;
        this.tabActive = "partai";
        this.tabDapil = "aiCenter tab";
        this.tabPartai = "aiCenter tab active";
        this.tabNomor = "aiCenter tab";
      });
    }
    
  }

  findCalegMultiparam(param1, param2, param3, token){
    this.restProvider.findCalegMultiparam(param1, param2, param3, token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;

        if (this.calegList.length == 0) {
          this.showInfo("Daftar caleg tidak ditemukan.");
        }

        if (this.filterNomor == "ASC") {
          this.filterNomor = "DESC";
        }else {
          this.filterNomor = "ASC";
        }
      });
  }

  getAllPartai() {
    this.restProvider.getAllPartai(this.token)
      .then(data => {
        this.response = data;
        this.partaiList = this.response.data;
      });
  }

  getAllCaleg() {
    this.restProvider.getAllCaleg(this.token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;
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
  }

  setActiveTab(page, myEvent) {
    if (page == "dapil") {
      this.tabActive = "dapil";
      this.tabDapil = "aiCenter tab active";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab";

      if (this.visibleDapil == true) {
        this.visibleDapil = false;
      }else {
        this.visibleDapil = true;
      }

      let popover = this.popoverCtrl.create(PopoverDapilPage, {cssClass: 'dapil-popover'});
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(dapil => {
        console.log("val : " + dapil);
        if (dapil == null) {
          this.filterDapil = "DAPIL";
        }else {
          this.filterDapilId = dapil.id;
          this.filterDapil = dapil.nama_daerah_pemilihan;
        }

        if (this.visibleDapil == true) {
          this.visibleDapil = false;
        }else {
          this.visibleDapil = true;
        }

        this.setDataToFindCaleg();
      });
    } else if (page == "partai") {
      this.tabActive = "partai";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab active";
      this.tabNomor = "aiCenter tab";

      if (this.visiblePartai == true) {
        this.visiblePartai = false;
      }else {
        this.visiblePartai = true;
      }

      let popover = this.popoverCtrl.create(PopoverPartaiPage);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(partai => {
        console.log("val : " + partai);
        if (partai == null) {
          this.filterPartai = "PARTAI";
        }else {
          console.log("partai id hoe : " + partai.id);
          this.filterPartaiId = partai.id;
          this.filterPartai = partai.nama;
        }

        if (this.visiblePartai == true) {
          this.visiblePartai = false;
        }else {
          this.visiblePartai = true;
        }

        this.setDataToFindCaleg();
      });
    } else if (page == "nomor") {
      this.tabActive = "nomor";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab active";

      if (this.visibleNomor == true) {
        this.visibleNomor = false;
      }else {
        this.visibleNomor = true;
      }

      let popover = this.popoverCtrl.create(PopoverLainPage);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(lain => {
        console.log("val : " + lain);
        if (lain == null) {
          this.filterLain = "LAINNYA";
        }else {
          this.filterLain = lain;
        }

        if (this.visibleNomor == true) {
          this.visibleNomor = false;
        }else {
          this.visibleNomor = true;
        }

        this.setDataToFindCaleg();
      });
    }
  }

  setDataToFindCaleg() {
    var param1 = "-1";
    var param2 = "-1";
    var param3 = "-1";

    if (this.filterDapil == "DAPIL") {
      param1 = "-1";
    }else {
      param1 = this.filterDapilId;
    }
    if (this.filterPartai == "PARTAI") {
      param2 = "-1";
    }else {
      param2 = this.filterPartaiId;
    }
    if (this.filterLain == "LAINNYA") {
      param3 = "-1";
    }else if (this.filterLain == "A - Z") {
      param3 = "nama ASC";
    }else if (this.filterLain == "Z - A") {
      param3 = "nama DESC";
    }else if (this.filterLain == "NOMOR") {
      param3 = "nomor " + this.filterNomor;
    }

    this.findCalegMultiparam(param1, param2, param3, this.token);
  }

  goToDetailCaleg(caleg) {
    this.app.getRootNav().push(DetailOtherUserPage, {caleg: caleg, role: "caleg"});
  }

  showInfo(text) {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: text,
      buttons: ['Tutup']
    });
    alert.present();
  }
}
