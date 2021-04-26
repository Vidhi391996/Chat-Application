import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {
  emojisList:any=require('emojis-list');
  emojisUnicode = require('emojis-unicode');

  constructor() { }

  ngOnInit(): void {
    console.log("emojisUnicode",this.emojisUnicode);
    let found_elem = _.findKey(this.emojisUnicode, function(item) { return item.indexOf("1f004") !== -1; });
      console.log("found_elem",found_elem);
  }

  selectEmoji(index:any)
  {
    
  }

}
