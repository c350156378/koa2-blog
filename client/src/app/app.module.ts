import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { ListComponent } from './list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailComponent } from './detail/detail.component';
import { PublishComponent } from './publish/publish.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingComponent } from './setting/setting.component';
import { BriefPipe } from './brief.pipe';

import { SettingService } from './setting/setting.service';
import { SearchComponent } from './search/search.component';

import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

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
    TopMenuComponent,
    AppFooterComponent,
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
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    Ng2BreadcrumbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SettingService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
