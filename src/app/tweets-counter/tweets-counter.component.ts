import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { interval, Observable } from 'rxjs';
import { AverageTweets } from '../store/tweets/tweets.actions';
import { Tweet } from '../store/tweets/tweets.model';

@Component({
  selector: 'app-tweets-counter',
  templateUrl: './tweets-counter.component.html',
  styleUrls: ['./tweets-counter.component.scss']
})
export class TweetsCounterComponent implements OnInit {
  private totalTweets = 0;
  private tweets$: Observable<Tweet[]> | undefined;
  averageTweets$: Observable<number> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.tweets$ = this.store.select(state => state.tweets.tweets);
    this.tweets$.subscribe((data) => {
      this.totalTweets = data.length;
    });
    this.averageTweets$ = this.store.select(state => state.tweets.average);
    this.startCountingTweets();
  }

  // take the average of all tweets per minute
  startCountingTweets(): void {
    interval(10000).pipe().subscribe((minutes)=> {
      const average = this.totalTweets / (minutes + 1);
      this.store.dispatch(new AverageTweets(Math.round(average)))
    });
  }

}
