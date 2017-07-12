import { Component, OnInit, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  article:any = {

  };

  constructor(private cdr: ChangeDetectorRef, private http: Http, private route: ActivatedRoute) { }

  ngOnInit():void {
    this.route.params
      .switchMap((params: Params) => this.getDetail(params['id']))
      .subscribe(article => {
        
        this.article = article.data;
        console.log(this.article);
      });
  }

  getDetail(id): Promise<any>{
    return this.http.get(`detail/${id}`).toPromise().then(res => res.json());
  }

   ngAfterViewInit(){
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges()
    this.cdr.markForCheck();

  }
}
