import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component'; 
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import * as _ from 'lodash';
import {DialogModule} from 'primeng/dialog';
import {HttpClientModule} from 
    '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfileComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AccordionModule,
    DropdownModule,
    DialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports:[
    FlexLayoutModule,
    AccordionModule,
    DialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
