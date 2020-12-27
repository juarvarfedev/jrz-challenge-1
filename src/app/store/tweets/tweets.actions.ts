import { Tweet } from './tweets.model';


export class AddTweet {
    static readonly type = '[Tweets] Add TWeet';
    constructor( public payload: Tweet ) {}
}

export class AverageTweets {
    static readonly type = '[Tweets] Average Tweets';
    constructor( public payload: number ) {}
}


