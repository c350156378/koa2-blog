import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingService {
  URL:string = 'http:localhost:3000';
  constructor(private http: Http) { }
  getSysInfo(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers })
    return this.http.get(this.URL + '/api/setting', options)
      .map(res => {
      const body = res.json();
      return body.data || {};
    });

  }
}
