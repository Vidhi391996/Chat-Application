import { Injectable, NgZone } from '@angular/core';
import { CouchDbConfig } from '../config/env.config';
import { Subject } from "rxjs";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersListEmitter: Subject<any> = new Subject<any>();

  chatEmitter: Subject<any> = new Subject<any>();

  profileEmitter: Subject<any> = new Subject<any>();

  constructor(private zone: NgZone) { }

  //establish couch db connection
  establishCouchDBConnection() {
    let PouchDB = require('pouchdb').default;
    let url = CouchDbConfig.couchDbUrl + CouchDbConfig.system;
    let database = new PouchDB(url);
    return database;
  }

  //update documnt
  updateDocument(document: any) {
    let database = this.establishCouchDBConnection();
    database.put(document).then((res: any) => {
      console.log("Document inserted OK");
    }).catch((err: any) => {
      console.error(err);
    });
  }

  //update user chat in couchdb
  updateChat(documentName: any, chat: string) {
    let database = this.establishCouchDBConnection();
    database.get(documentName).then((document: any) => {
      document.message = chat;
      this.updateDocument(document);
    });
  }

  //update user profile details in couchdb
  updateProfileDetails(profileDetails: any) {
    let database = this.establishCouchDBConnection();
    database.get('profile').then((document: any) => {
      document.name = profileDetails.name;
      document.age = profileDetails.age;
      document.address = profileDetails.address;
      this.updateDocument(document);
    });
  }

  //check couch db document exisst if not than create
  checkCouchDbDocumentExist(documentName: any) {
    let database = this.establishCouchDBConnection();
    database.get(documentName).then((document: any) => {
      if (document.type == documentName) {
        if (documentName != 'profile') {
          this.chatEmitter.next(document);
        }
        else {
          this.profileEmitter.next(document);
        }
      }
    }).then(function (response: any) {
    }).catch(function (err: any) {
      let document = {
        _id: documentName,
        message: [],
        type: documentName,
      };
      database.put(document).then((res: any) => {
        console.log("Success");
      }).catch((err: any) => {
        console.error(err);
      });
    });
  }

  //fetch live data of users list
  fetchDataOfUserListOnChange() {
    let database = this.establishCouchDBConnection();
    let opts = {
      include_docs: true,
      live: true,
    };
    database.changes(opts).on('change', (change: any) => {
      database.allDocs({ include_docs: true }).then((res: any) => {
        let found_elem = _.findKey(res.rows, function (item) { return item.doc.type == "users_list"; });
        if (found_elem != undefined) this.usersListEmitter.next(res.rows[parseInt(found_elem)].doc);
      })
    })
  }
}
