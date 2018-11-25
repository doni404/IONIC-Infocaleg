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
    public httpangular: Http,) {
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
      this.httpangular.post(this.apiUrl + '/masuk?token=2', postData, options)
        .subscribe(res => {
          resolve(res.json());
          console.log(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
