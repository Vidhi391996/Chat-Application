import { Injectable ,NgZone} from '@angular/core';
import { CouchDbConfig } from '../config/env.config';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  emitter: Subject<any> = new Subject();

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
  }
  
  checkCouchDbDocExist(documentName:any)
  {
    let db=this.establishCouchDBConnection();
    db.get(documentName).then(function(doc:any) {
    }).then(function(response:any) {
    }).catch(function (err:any) {
      let doc = {
        _id: documentName,
        name: [],
        type:documentName
    };
    db.put(doc).then((res:any) => {
      console.log("Document inserted OK");
    }).catch((err:any) => {
      console.error(err);
    });
    });
  }

  createCouchDbDoc()
  {
    let db=this.establishCouchDBConnection();

      let doc = {
        _id: 'users_list',
        name: []
    };
    db.put(doc).then((res:any) => {
      console.log("Document inserted OK");
    }).catch((err:any) => {
      console.error(err);
    });
  }
}
