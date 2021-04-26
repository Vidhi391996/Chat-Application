import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatScreenComponent } from './components/chat-screen/chat-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  exports:[
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
