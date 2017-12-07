import { Input, ApplicationRef, NgZone, Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { AuthService } from './auth.service';

import { SettingService } from './setting/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SettingService ]
})
export class AppComponent implements OnInit {
  title = 'app works!';

  last: string = '';
  public menus: MenuItem[];
  public breadcrumbs: MenuItem[];
  sys: any = {};
  currentUser = null;

  constructor(public settingService: SettingService, public cdr: ChangeDetectorRef, public authService: AuthService, public router: Router) { }


  ngOnInit() {

    this.settingService.getSysInfo().subscribe(sys => {
      this.sys = sys[0];
    });

    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));

    this.menus = [{
      label: '首页', icon: 'fa-home',
      url: '/'
    },
    {
      label: '英雄', command: (event) => { }
    }, {
      label: '危机', command: (event) => { }
    }];

    this.breadcrumbs = [];

  }

  login() {
    this.authService.login();
    console.log('denglu');
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }

  settings() {
    this.router.navigate(['/setting']);
  }
}
