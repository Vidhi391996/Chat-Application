import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { CouchDbConfig } from '../../config/env.config';
import { Subject } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() profile: EventEmitter<any> = new EventEmitter();

  emojisList: any = require('emojis-list');
  usersList: any = [];
  showSendMessage: boolean = false;
  message: string = "";
  messageList: any = [];
  selectedUser: string = '';
  showEmojiCheck: boolean = false;
  hideLoader: boolean = true;

  constructor(private userService: UserService) {
    this.userService.usersListEmitter.subscribe((_element: any) => {
      this.usersList = [];
      for (let id in _element["data"]) {
        this.usersList.push(_element["data"][id]["name"]);
      }
    })
  }

  fetchUserChat(user: any) {
    this.hideLoader = false;
    this.userService.checkCouchDbDocumentExist(user);
    this.hideLoader = true;
    this.showSendMessage = true;
    this.selectedUser = user;
    this.userService.chatEmitter.subscribe((_element: any) => {
      this.messageList = [];
      this.messageList = _element.message;
    });
  }

  ngOnInit(): void {
    this.userService.fetchDataOfUserListOnChange();
  }

  //send message to user and save in couchdb
  sendMessage() {
    if (this.message != "" && this.message != null) {
      this.hideLoader = false;
      this.showEmojiCheck=false;
      this.showEmojiCheck=false;
      this.messageList[this.messageList.length] = this.message;
      this.userService.updateChat(this.selectedUser, this.messageList);
      this.message = "";
      this.hideLoader = true;
    }
  }

  //show emojis to send
  showIcons() {
    this.showEmojiCheck = !this.showEmojiCheck;
  }

  //attach emoji with message
  selectEmoji(index: any) {
    this.message = this.message + this.emojisList[index];
  }

  //show profile details
  showProfile() {
    this.profile.emit(true);
  }
}
