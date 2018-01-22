import { Http, Headers,HttpModule  } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PostServiceProvider {

  public api_url = 'http://www.profliebuilder.com/church/api/';
  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  get_post(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        this.http.post(this.api_url+'posts/list', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  comment(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        this.http.post(this.api_url+'posts/comment', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }


}
