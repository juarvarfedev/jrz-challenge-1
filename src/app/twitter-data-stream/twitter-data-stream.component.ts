import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, from, interval, Observable, of, timer } from 'rxjs';
import { concatMap, map, startWith } from 'rxjs/operators';
import { TwitterDataStreamService } from './twitter-data-stream.service';
import { Tweet } from '../store/tweets/tweets.model';


@Component({
  selector: 'app-twitter-data-stream',
  templateUrl: './twitter-data-stream.component.html',
  styleUrls: ['./twitter-data-stream.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TwitterDataStreamComponent implements OnInit {
  public tweets$: Observable<Tweet[]>;
  filter$: BehaviorSubject<string> | undefined;
  filteredTweets$: Observable<Tweet[]> | undefined;

  constructor(private twitterService: TwitterDataStreamService,
    private store: Store) {
    this.tweets$ = this.store.select(state => state.tweets.tweets);
  }

  ngOnInit(): void {
    this.twitterService.getTweets();
    this.twitterService.subscribeTwitterStream();

    this.filter$ = new BehaviorSubject('');
    this.filteredTweets$ = this.createFilterTweets(
      this.filter$,
      this.tweets$
    );
    this.tweetsPerMinute();
  }

  public createFilterTweets(
    filter$: Observable<string>,
    tweets$: Observable<Tweet[]>) {
    // We combine both of the input streams using the combineLatest
    // operator. Every time one of the two streams we are combining
    // here changes value, the project function is re-executed and
    // the result stream will get a new value. In our case this is
    // a new array with all the filtered tweets.
    return combineLatest(
      tweets$,
      filter$, 
      (tweets: Tweet[], filter: string) => {
        // this is the project function where we implement the filtering logic
        if (filter === '') return tweets;
        return tweets.filter(({country, countryCode}) => country.toLowerCase().includes(filter.trim().toLowerCase()) || countryCode.toLowerCase().includes(filter.trim().toLowerCase()));
      });
  }

  filterChanged(event: Event) {
    // Everytime we have new value, we pass it to the filter$
    const value = (event.target as HTMLInputElement).value;
    this.filter$?.next(value);
  }


  tweetsPerMinute() {
    const h = interval(1000).pipe(concatMap(() => this.tweets$.pipe(map((tweets) => tweets.length))));
    // const h = this.tweets$.interval(100).pipe(startWith(0)).subscribe((tweets:any) => tweets.length); 
    console.log(h);
    // return timer(0, 5000)
    // .subscribe(() => this.tweets$.pipe(map((tweets) => tweets.length)));

    // interval(60000).pipe(concatMap(() => this.tweets$.pipe(map((tweet, index) => console.log(index)))));
    // console.log(average);
  }

}
