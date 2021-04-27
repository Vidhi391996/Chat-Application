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
  }

  selectEmoji(index:any)
  {

  }

}
