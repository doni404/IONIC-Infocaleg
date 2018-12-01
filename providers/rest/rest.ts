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
      this.httpangular.put(this.apiUrl + '/changeprofile' + '?token=' + token, postData, options)
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

}
