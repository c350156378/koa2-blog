import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private settingService: SettingService, private router: Router) {
  }
  ngOnInit() {
    this.settingService.getSysInfo().subscribe(sys => {
      console.log(sys[0]);
      this.sys = sys[0];
    });
    
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges()
    this.cdr.markForCheck();

  }



}
