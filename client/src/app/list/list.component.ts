import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  articles: any = [];
  public totalItems: number;
  public currentPage: number = 1;
  public itemsPerPage: number = 5;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getArticles(0);
  }

  getArticles(currentPage:number){
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers })
    let url = `list/${currentPage}`;
    this.http.get(url, options).map(res => {
      const body = res.json();
      return body || {};
    }).subscribe(
      (articles) => {
        this.articles = articles.data;
        this.totalItems = articles.count;
      },
      (err) => {
        console.log(err);
      }
      );
  }



  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.getArticles(event.page);
  }
  editArticle(index){

  }
  removeArticle(article){
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers })
    let url = `detail/${article._id}`;
    this.articles =  this.articles.filter(h => h !== article);
    this.http.delete(url, options).map(res => {
      const body = res.json();
      return body || {};
    }).subscribe(
      () => null,
      (err) => {
        console.log(err);
      }
      );
    this.getArticles(0);
    
  }

}
