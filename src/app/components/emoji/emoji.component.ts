import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from "rxjs";

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {
  emojisList:any=require('emojis-list');

  constructor() { }

  ngOnInit(): void {
    // let found_elem = _.findKey(this.emojisUnicode, function(item) { return item.indexOf("1f004") !== -1; });
    //   console.log("found_elem",found_elem);
  }

  selectEmoji(index:any)
  {

  }

}
