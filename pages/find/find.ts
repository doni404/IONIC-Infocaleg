import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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

  filterDapil = "DAPIL";
  filterPartai = "PARTAI";
  filterLain = "NO.URUT";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');
  }

  showInput() {
    console.log("input : " + this.keyword);
  }

  search() {

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

}
