import { Component, OnInit } from '@angular/core';
import {UserService} from '../../providers/user.service';
import { CouchDbConfig } from '../../config/env.config';
import { Subject } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  emojisList:any=require('emojis-list');
  usersList:any=[];
  message:string="";
  messageList:any=[];
  chat:string='';
  selectedUser:string='';
  

  constructor(private userService:UserService) { 
    this.userService.usersListEmitter.subscribe((_element: any)=>{
      for(let id in _element["data"])
        {
          this.usersList.push(_element["data"][id]["name"]);
        }
    })
  }

  fetchUserChat(user:any)
  {
    this.userService.checkCouchDbDocExist(user);
    this.userService.chatEmitter.subscribe((_element: any)=>{
      this.messageList=[];
      this.chat=_element.message;
      this.selectedUser=user;
      if(_element.message.split(",")!="")
      {
        this.messageList=_element.message.split(",");
      }
    });
  }

  ngOnInit(): void {
    this.userService.checkCouchDbDocExist('users_list');
  }

  sendMessage()
  {
    if(this.message!="" && this.message!=null)
    {
      if(this.messageList.length>0)
      {
        this.chat=this.chat+","+this.message;
      }
      else
      {
        this.chat=this.message;
      }
      this.userService.updateChat(this.selectedUser,this.chat);
      this.messageList=this.chat.split(",");
      this.message="";
    }
  }

}
