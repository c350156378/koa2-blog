import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  URL:string = 'http:localhost:3000/';

  constructor(private http: Http) { }

  search(term): Observable<any>{
    return this.http
      .get(`${this.URL}api/articles/?name=${term}`)
      .map(res => res.json().data);
  }

}
