import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  search(term): Observable<any>{
    return this.http
      .get(`api/articles/?name=${term}`)
      .map(res => res.json().data);
  }

}
