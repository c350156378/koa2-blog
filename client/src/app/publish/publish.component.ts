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
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  article: any = {};

  heroes: SelectItem[];

  selectedCity: string;

  editor;

  constructor(private http: Http, private router: Router) {
    this.heroes = [];
    this.heroes.push({ label: '危机', value: null });
    this.heroes.push({ label: '英雄', value: { id: 1, name: '英雄', code: 'YX' } });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#elementId',
      height: 300,
      plugins: [
        'link',
        'table',
        'paste',
        'insertdatetime',
        'image',
        'imagetools'
      ],
      language_url: 'assets/langs/zh_CN.js',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
          this.article.article_content = content;
        });
      },
      image_title: true,
      automatic_uploads: true,
      images_upload_url: '/api/upload',
      file_picker_types: 'image',
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        // Note: In modern browsers input[type="file"] is functional without 
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.

        input.onchange = function() {
          var file = input.files[0];

          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), { title: file.name });
          };
        };

        input.click();
      }
    });

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  onSubmit() {
    const headers = new Headers({ 'content-type': 'application/json' });
    const jwt = '123';
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }

    const options = new RequestOptions({ headers: headers });

    this.http.post('/api/publish', JSON.stringify(this.article), options).map(res => {
      const body = res.json();
      return body || body.data || {};
    }).subscribe(article => {
      if (article.success) {
        this.router.navigate(['/list']);
      }
      //
    })
  }

}
