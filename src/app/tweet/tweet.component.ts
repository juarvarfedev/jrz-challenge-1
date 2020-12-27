import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../store/tweets/tweets.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet | undefined;
  

  constructor() { }

  ngOnInit(): void {
  }

}
