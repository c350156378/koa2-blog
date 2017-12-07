import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';



import { ListComponent } from './list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailComponent } from './detail/detail.component';
import { PublishComponent } from './publish/publish.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingComponent } from './setting/setting.component';
import { BriefPipe } from './brief.pipe';

import { SettingService } from './setting/setting.service';
import { SearchComponent } from './search/search.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


import {MenubarModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';

const appRoutes: Routes = [
  { path: 'setting', canActivate: [AuthGuard], component: SettingComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'publish', canActivate: [AuthGuard], component: PublishComponent },
  { path: 'list', component: ListComponent },
  { path: 'heroes', component: ListComponent },
  { path: 'crisis-center', component: ListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PageNotFoundComponent,
    DetailComponent,
    PublishComponent,
    SidebarComponent,
    SettingComponent,
    BriefPipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MenubarModule,
    DataListModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbModule,
    ContextMenuModule,
    PanelModule,
    DropdownModule,
    FileUploadModule
  ],
  providers: [SettingService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
