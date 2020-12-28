import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { TwitterDataStreamService } from './twitter-data-stream.service';
import { Tweet } from '../store/tweets/tweets.model';

@Component({
  selector: 'app-twitter-data-stream',
  templateUrl: './twitter-data-stream.component.html',
  styleUrls: ['./twitter-data-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TwitterDataStreamComponent implements OnInit {
  filter$ = new BehaviorSubject('');
  ds = new MyDataSource(this.store, this.filter$);
  constructor(private twitterService: TwitterDataStreamService,
    private store: Store){}

  ngOnInit(): void {
    this.twitterService.getTweets();
    this.twitterService.subscribeTwitterStream();
  }
  
  filterChanged(event: Event) {
    // Everytime we have new value, we pass it to the filter$
    const value = (event.target as HTMLInputElement).value;
    this.filter$.next(value);
  }
}

export class MyDataSource extends DataSource<Tweet | undefined> {

  private dataStream = new BehaviorSubject<Tweet[]>([]);
  private subscription = new Subscription();
  private tweets$: Observable<Tweet[]>;
  private filteredTweets$;

  constructor(private store: Store, private filter$:BehaviorSubject<string>) {
    super();
    this.tweets$ = this.store.select(state => state.tweets.tweets);
    this.filteredTweets$ = this.createFilterTweets(
      this.filter$,
      this.tweets$
    );
    this.filteredTweets$.subscribe((data) => {
      this.formatDta(data);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Tweet[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe((range) => {
      // console.log(range.start);
      // console.log(range.end);
    }));
    return this.dataStream;
}

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  formatDta(_body: Tweet[]): void {
    this.dataStream.next(_body);
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
}