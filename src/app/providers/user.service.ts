import { Injectable ,NgZone} from '@angular/core';
import { CouchDbConfig } from '../config/env.config';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersListEmitter: Subject<any> = new Subject<any>();

  chatEmitter: Subject<any> = new Subject<any>();

  constructor(private zone: NgZone) { }

  establishCouchDBConnection()
  {
    let PouchDB = require('pouchdb').default;
    let url=CouchDbConfig.couchDbUrl+CouchDbConfig.system;
    let db= new PouchDB(url);
    return db;
  }

  fetchUsersNameDocumentDetails()
  {
    // let db=this.establishCouchDBConnection();
    // let docDetail={};
    // db.get('users_list').then( (res:any) =>  {
    //   this.zone.run(() => {
    //     this.emitter.next( res.map(function (row:any) { return row.doc; }));
    //   });
    // }).catch(function (err:any) {
     
    // });
    // .then(function(response:any) {
    // })
  //  return docDetail;
  }

  check()
  {
  //   this.emitter.subscribe((resp )=> {
  //     console.log("respppp",resp);
  //   })
  //  let doc= this.fetchUsersNameDocumentDetails();
  //  console.log("docccccc");
  //  let doc = {
    //     _id: 'vidhi',
    //     name: 'gggggg',
    //     type:documentName
    // };
    // db.put(doc).then((res:any) => {
    //   console.log("Document inserted OK");
    // }).catch((err:any) => {
    //   console.error(err);
    // });
  }
  
  updateChat(documentName:any,chat:string)
  {
    let db=this.establishCouchDBConnection();
    db.get(documentName).then((doc:any) => {
      doc.message=chat;
      db.put(doc).then((res:any) => {
        console.log("Document inserted OK");
      }).catch((err:any) => {
        console.error(err);
      });
    });
  }

  checkCouchDbDocExist(documentName:any)
  {
    let db=this.establishCouchDBConnection();
    db.get(documentName).then((doc:any) => {
      if(doc.type=="users_list")
      {
        this.usersListEmitter.next(doc);
      }
      else
      {
        this.chatEmitter.next(doc);
      }
     }).then(function(response:any) {
    }).catch(function (err:any) {
       let doc = {
        _id: documentName,
        message: "",
        type:documentName,
    };
    db.put(doc).then((res:any) => {
      console.log("Document inserted OK");
    }).catch((err:any) => {
      console.error(err);
    });
    });
  }

}
