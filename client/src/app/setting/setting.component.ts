import { Component, OnInit, ViewChild, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';

import { FormControl, FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';

import { Router } from '@angular/router';

import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  @ViewChild('poster') poster: ElementRef;
  sys: any = {};
  sysForm: FormGroup;
  myFile:any = [];


  constructor(private cdr: ChangeDetectorRef ,private router: Router, private fb: FormBuilder, private http: Http, private elementRef: ElementRef, private renderer: Renderer2, private settingService: SettingService) { 
    // this.createForm();
  }

  ngOnInit() {
    this.getSysInfo();
  }

  // createForm(){
  //   this.sysForm = this.fb.group({
  //     blog_poster:'',
  //     blog_title:'',
  //     blog_desc: ''
  //   });
  // }

  processWebImage(e) {
    const file = e.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', () => {
        //this.renderer.setAttribute(this.poster.nativeElement, 'src', reader.result);
        this.sys.blog_poster = reader.result;
      });
      reader.readAsDataURL(file);

    }
  }

  onSubmit() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const jwt = '123';
    if (jwt) {
      headers.append("Authorization", "Bear " + jwt);
    }
    const options = new RequestOptions({ headers: headers })
    this.http.post('/api/setting', JSON.stringify(this.sys), options).map(res => {
      const body = res.json();
      return body.data || {};
    }).subscribe(
      (sys) => {
        this.sys = sys[0];
        
      },
      (err) => {
        console.log(err);
      }
      );
      this.router.navigate([''])
      
  }

  getSysInfo(){
    this.settingService.getSysInfo().subscribe(
      (sys) => {
        this.sys = sys[0];
      },
      (err) => {
        console.log(err);
      }
      );

  }

}
