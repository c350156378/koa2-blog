import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  article:any = {};
  
  editor;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#elementId',
      height:300,
      plugins: [
        'link',
        'table',
        'paste'
      ],
      skin_url: 'assets/skins/lightgray',
      language_url: 'assets/langs/zh_CN.js',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
          this.article.article_content = content;
        });
      }
    });
   
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  onSubmit(){
    const headers = new Headers({'content-type': 'application/json'});
    const jwt = '123';
    if(jwt){
      headers.append('Authorization', 'Bear '+jwt);
    }

const options = new RequestOptions({headers: headers});

    this.http.post('/publish', JSON.stringify(this.article), options).map(res => {
      const body = res.json();
      return body||body.data||{};
    }).subscribe(article => {
      if(article.success){
        this.router.navigate(['/list']);
      }
      //
    })
  }

}
