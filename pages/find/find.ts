import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { PopoverDapilPage } from '../popover-dapil/popover-dapil';
import { PopoverPartaiPage } from '../popover-partai/popover-partai';
import { PopoverLainPage } from '../popover-lain/popover-lain';

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
  penggunaId: any;
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
  filterLain = "NO.URUT";

  pulauList = [
    {src:"../../assets/imgs/pulau/Sumatra.png", nama:"sumatra"},
    {src:"../../assets/imgs/pulau/Kalimantan.png", nama:"kalimantan"},
    {src:"../../assets/imgs/pulau/Jawa.png", nama:"jawa"},
    {src:"../../assets/imgs/pulau/Sulawesi.png", nama:"sulawesi"},
    {src:"../../assets/imgs/pulau/Bali.png", nama:"bali"},
    {src:"../../assets/imgs/pulau/NusaTenggara.png", nama:"nusa tenggara"},
    {src:"../../assets/imgs/pulau/Maluku.png", nama:"maluku"},
    {src:"../../assets/imgs/pulau/Papua.png", nama:"papua"}
  ];

  partaiList: any;

  // = [
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/117/logo%20PKB.jpeg", nomor:1},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/118/LAMBANG%20PARTAI%20GERINDRA%2010x10%20cm.jpg", nomor:2},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/120/LOGO%20KPU.jpg", nomor:3},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/131/Logo%20Partai%20GOLKAR%20(Ukuran%2010x10cm).jpg", nomor:4},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/115/LAMBANG'.jpg", nomor:5},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/128/Logo-Partai-Garuda.jpg", nomor:6},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/126/Logo%20PARTAI%20BERKARYA.jpg", nomor:7},
  //   {src:"https://infopemilu.kpu.go.id/download/logoParpol/116/Logo%20PKS%20(2013)%20w%20bg%20(bigger).jpg", nomor:8}
  // ];

  calegList: any;

  // [
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/28917/19", nomor:1, nama:"H. MUSLIM AYUB", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/30195/19", nomor:2, nama:"MOHD ALFATAH", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/112209/19", nomor:3, nama:"ZAKIYAH DRAZAT", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/202211/19", nomor:4, nama:"H. NAZARUDDIN DEK GAM", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/122594/19", nomor:5, nama:"LELI HERAWATI", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/35028/19", nomor:6, nama:"MARGONINGSIH", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/30115/19", nomor:7, nama:"SULAIMAN ALI", partai:"PARTAI AMANAT NASIONAL", dapil:"ACEH I"},
  //   {src:"https://silonpemilu.kpu.go.id/publik/calon/21661/19", nomor:8, nama:"NURCHALIS", partai:"PARTAI BERKARYA", dapil:"ACEH II"}
  // ];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public popoverCtrl: PopoverController) {

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

  findCaleg(keyword) {
    this.restProvider.findCaleg(keyword, this.token)
      .then(data => {
        this.response = data;
        this.calegList = this.response.data;
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
    // this.findUser(this.sort);
  }

  setActiveTab(page, myEvent) {
    if (page == "dapil") {
      this.tabActive = "dapil";
      this.tabDapil = "aiCenter tab active";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab";

      let popover = this.popoverCtrl.create(PopoverDapilPage, {cssClass: 'dapil-popover'});
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(dapil => {
        console.log("val : " + dapil);
        if (dapil == null) {
          this.filterDapil = "DAPIL";
        }else {
          this.filterDapil = dapil;
        }
      });
    } else if (page == "partai") {
      this.tabActive = "partai";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab active";
      this.tabNomor = "aiCenter tab";

      let popover = this.popoverCtrl.create(PopoverPartaiPage);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(partai => {
        console.log("val : " + partai);
        if (partai == null) {
          this.filterPartai = "PARTAI";
        }else {
          this.filterPartai = partai;
        }
      });
    } else if (page == "nomor") {
      this.tabActive = "nomor";
      this.tabDapil = "aiCenter tab";
      this.tabPartai = "aiCenter tab";
      this.tabNomor = "aiCenter tab active";

      let popover = this.popoverCtrl.create(PopoverLainPage);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(lain => {
        console.log("val : " + lain);
        if (lain == null) {
          this.filterLain = "NO.URUT";
        }else {
          this.filterLain = lain;
        }
      });
    }

    // this.getAllRank(this.tabActive, this.sort, this.token);
  }

  chooseRegion(region) {
    console.log(region);
  }

}
