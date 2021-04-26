import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component'; 
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { EmojiComponent } from './components/emoji/emoji.component';
import * as _ from 'lodash';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfileComponent,
    EmojiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AccordionModule,
    DropdownModule
  ],
  exports:[
    FlexLayoutModule,
    AccordionModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
