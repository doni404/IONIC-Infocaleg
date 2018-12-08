import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://18.182.255.183/api';
  // devApiUrl = 'http://52.198.34.72/api';

  constructor(
    public http: HttpClient,
    public httpangular: Http, ) {
    console.log('Hello RestProvider Provider');
  }

  login(username, password) {
    console.log(username);
    console.log(password);

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "username": username,
      "password": password
    });

    return new Promise((resolve, reject) => {
      this.httpangular.post(this.apiUrl + '/login?token=true', postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(name, username, password, email) {

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "name": name,
      "username": username,
      "password": password,
      "email": email
    });

    return new Promise((resolve, reject) => {
      this.httpangular.post(this.apiUrl + '/register?token=true', postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  editProfile(name, idPengguna, token) {

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "name": name,
      "pengguna_id": idPengguna
    });

    return new Promise((resolve, reject) => {
      this.httpangular.put(this.apiUrl + '/changeprofilename' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllTimeline(penggunaId, sort = "new", token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/campaigntimeline/' + penggunaId + '/' + sort + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/campaigntimeline/' + penggunaId + '/' + sort + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  likeCampaign(idKampanye, idPengguna, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_kampanye": idKampanye,
      "id_pengguna": idPengguna
    });

    return new Promise((resolve, reject) => {
      this.httpangular.put(this.apiUrl + '/campaignlike' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  dislikeCampaign(idKampanye, idPengguna, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_kampanye": idKampanye,
      "id_pengguna": idPengguna
    });

    return new Promise((resolve, reject) => {
      this.httpangular.put(this.apiUrl + '/campaigndislike' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllCampaignComment(kampanyeId, penggunaId, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/campaigncomment/' + kampanyeId + '/' + penggunaId +'?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/campaigncomment/' + kampanyeId + '/' + penggunaId + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  createComment(idKampanye, idPengguna, komentar, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_kampanye": idKampanye,
      "id_pengguna": idPengguna,
      "komentar": komentar
    });

    return new Promise((resolve, reject) => {
      this.httpangular.post(this.apiUrl + '/comment' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  likeComment(idKomentarKampanye, idPengguna, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_komentar_kampanye": idKomentarKampanye,
      "id_pengguna": idPengguna
    });

    return new Promise((resolve, reject) => {
      this.httpangular.put(this.apiUrl + '/commentlike' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  dislikeComment(idKomentarKampanye, idPengguna, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_komentar_kampanye": idKomentarKampanye,
      "id_pengguna": idPengguna
    });

    return new Promise((resolve, reject) => {
      this.httpangular.put(this.apiUrl + '/commentdislike' + '?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllRank(userRole, sort, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/userrank/' + userRole + '/' + sort +'?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/userrank/' + userRole + '/' + sort + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  getAllCommentByUser(idPengguna, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/commentbyuser/' + idPengguna +'?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/commentbyuser/' + idPengguna +'?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  getAllDapil(token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/dapil' + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/dapil' + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  getAllPartai(token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/partai' + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/partai' + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  getAllCaleg(token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/caleg' + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/caleg' + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  findCaleg(keywoard, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/caleg/' + keywoard + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/caleg/' + keywoard + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  findCalegByPengguna(idPengguna, token) {
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/calegbypengguna/' + idPengguna + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/calegbypengguna/' + idPengguna + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  findCalegByIsland(island, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/calegbyisland/' + island + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/calegbyisland/' + island + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  findCalegByPartai(idPartaiPolitik, token) {
    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/calegbypartai/' + idPartaiPolitik + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/calegbypartai/' + idPartaiPolitik + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  findCalegMultiparam(idDapil, idPartaiPolitik, sortType, token) {
    console.log('iddapil : ' + idDapil);
    console.log('idparpol : ' + idPartaiPolitik);
    console.log('sort : ' + sortType);

    if (token != '' || token != null) {
      console.log('token : true');
    }

    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/calegbymultiparam/' + idDapil + '/' + idPartaiPolitik + '/' + sortType + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/calegbymultiparam/' + idDapil + '/' + idPartaiPolitik + '/' + sortType + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }

  rateCaleg(idCalonLegislatif, idPengguna, rate, token) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json'
      });

    let options = new RequestOptions({ headers: headers });

    let postData = JSON.stringify({
      "id_calon_legislatif": idCalonLegislatif,
      "id_pengguna": idPengguna,
      "rate": rate
    });

    return new Promise((resolve, reject) => {
      this.httpangular.post(this.apiUrl + '/calegrate?token=' + token, postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getRateCaleg(idCalonLegislatif, idPengguna, token) {
    let headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      });

    let options = new RequestOptions({ headers: headers });
    console.log(this.apiUrl + '/calegrate/' + idPengguna + '/' + idCalonLegislatif + '?token=' + token);
    return new Promise(resolve => {
      this.httpangular.get(this.apiUrl + '/calegrate/' + idPengguna + '/' + idCalonLegislatif + '?token=' + token, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
        });
    });
  }
  
}
