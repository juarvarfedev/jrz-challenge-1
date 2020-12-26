import { Tweet } from './tweets.model';


export class AddTweet {
    static readonly type = '[Tweets] AddTWeet';
    constructor( public payload: Tweet ) {}
}


