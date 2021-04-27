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
  showIconsCheck: boolean = false;

  constructor(private userService: UserService) {
    this.userService.fetchDataOfUserListOnChange();
    this.userService.usersListEmitter.subscribe((_element: any) => {
      this.usersList = [];
      for (let id in _element["data"]) {
        this.usersList.push(_element["data"][id]["name"]);
      }
    })
  }

  fetchUserChat(user: any) {
    this.userService.checkCouchDbDocExist(user);
    this.showSendMessage = true;
    this.userService.chatEmitter.subscribe((_element: any) => {
      this.messageList = [];
      this.selectedUser = user;
      this.messageList = _element.message;
    });
  }

  ngOnInit(): void {
    this.userService.checkCouchDbDocExist('users_list');
  }

  //send message to user and save in couchdb
  sendMessage() {
    if (this.message != "" && this.message != null) {
      this.messageList[this.messageList.length] = this.message;
      this.userService.updateChat(this.selectedUser, this.messageList);
      this.message = "";
    }
  }

  //show emojis to send
  showIcons() {
    this.showIconsCheck = !this.showIconsCheck;
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
