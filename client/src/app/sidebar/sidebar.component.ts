import {Input, ApplicationRef ,NgZone ,Component, OnInit, AfterViewInit,ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { SettingService } from '../setting/setting.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sys: any = {};
  currentUser = null;


  constructor(public nz:NgZone, public ar:ApplicationRef, public authService: AuthService, public cdr: ChangeDetectorRef, public settingService: SettingService, public router: Router) {
  }
  ngOnInit() {
    this.settingService.getSysInfo().subscribe(sys => {
      this.sys = sys[0];
    });
    
    // this.currentUser = JSON.parse(localStorage.getItem('userInfo'));

  }

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
  }

}
