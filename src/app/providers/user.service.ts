import { Injectable ,NgZone} from '@angular/core';
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
  
  //update user chat in couchdb
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

  //update user profile details in couchdb
  updateProfileDetails(profileDetails:any)
  {
    let db=this.establishCouchDBConnection();
    db.get('profile').then((doc:any) => {
      doc.name=profileDetails.name;
      doc.age=profileDetails.age;
      doc.address=profileDetails.address;
      db.put(doc).then((res:any) => {
        console.log("Document inserted OK");
      }).catch((err:any) => {
        console.error(err);
      });
    });
  }

  //check couch db document exisst if not than create
  checkCouchDbDocExist(documentName:any)
  {
    let db=this.establishCouchDBConnection();
    db.get(documentName).then((doc:any) => {
      if(doc.type==documentName)
      {
        if(documentName!='profile')
        {
          this.chatEmitter.next(doc);
        }
        else
        {
          this.profileEmitter.next(doc);
        }
      }
     }).then(function(response:any) {
    }).catch(function (err:any) {
       let doc = {
        _id: documentName,
        message: [],
        type:documentName,
    };
    db.put(doc).then((res:any) => {
      console.log("Document inserted OK");
    }).catch((err:any) => {
      console.error(err);
    });
    });
  }

  //fetch live data of users list
  fetchDataOfUserListOnChange()
  {
    let db=this.establishCouchDBConnection();
    let opts = {
      include_docs: true,
      live: true,
    };
      db.changes(opts).on('change',(change:any)=>{
      db.allDocs({include_docs: true}).then( (res:any) => {
         let found_elem = _.findKey(res.rows, function(item) { return item.doc.type=="users_list" ; });
         if(found_elem!=undefined)this.usersListEmitter.next(res.rows[parseInt(found_elem)].doc);
    })
    })
  }

}
