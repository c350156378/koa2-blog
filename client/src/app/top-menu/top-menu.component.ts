import { Component, OnInit, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ModalDirective } from 'ngx-bootstrap/modal';


import { SearchService } from '../search/search.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  providers: [SearchService]
})
export class TopMenuComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public isCollapsed: boolean = true;
  public isModalShown: boolean = false;
  urls = [];


  currentUser = null;


  private searchTerms = new Subject<string>();
  articles: Observable<any>;
  login: any = {};


  constructor(private route: ActivatedRoute, private authService: AuthService, private cdr: ChangeDetectorRef, private el: ElementRef, private renderer: Renderer2, private http: Http, private searchService: SearchService, private router: Router) { }
  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.articles = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchService.search(term) : Observable.of([]))
      .catch(error => {
        console.log(error);
        return Observable.of([]);
      })
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));

    
  }

  ngAfterViewInit() {
    console.log(location.pathname);
    
    if(location.pathname === '/login'){
      this.staticModal.show();
    }
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    
    
  }

  gotoDetail(article): void {
    let link = ['/detail', article._id];
    this.router.navigate(link);
    this.search('');
  }

  onSubmit() {
    localStorage.setItem('userInfo', JSON.stringify({ "userInfo": { "name": "739077689" } }));
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
    this.staticModal.hide();
    this.authService.isLoggedIn = true;
    this.router.navigate(['/']);

    this.http.post('login', JSON.stringify(this.login)).map(res => {
      const body = res.json();
      return res.json().data || {};
    }).subscribe(userInfo => {


    });
  }
  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.staticModal.hide();
  }
  public onHidden(): void {
    this.isModalShown = false;
  }

  logout(): void {
    localStorage.removeItem('userInfo');
    this.currentUser = null;
    this.authService.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  skip(){
    this.router.navigateByUrl('https://baidu.com');
  }

}
