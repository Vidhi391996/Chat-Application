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

  emitter: Subject<any> = new Subject();
  usersList:any=[];

  constructor(private userService:UserService) { 
   let db=this.userService.establishCouchDBConnection();
    let docDetail={};
    db.get('users_list').then( (res:any) =>  {
      for(let id in res["data"])
      {
        this.usersList.push(res["data"][id]["name"]);
      }
    }).catch(function (err:any) {
    });
  }

  ngOnInit(): void {
   // this.userService.checkCouchDbDocExist('vidhi');
  }

}
