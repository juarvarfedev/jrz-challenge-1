import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
// import { TweetsStateModel } from './tweets.model';
import { AddTweet, AverageTweets } from './tweets.actions';
import { Tweet } from './tweets.model';


export interface TweetsStateModel {
    tweets: Tweet[];
    average: number;
}
@State<TweetsStateModel>({
    name: 'tweets',
    defaults: {
        tweets: [],
        average: 0
    }
})

@Injectable()
export class TweetsState {
    @Action(AddTweet)
    public addTweet({ getState, patchState, setState }: StateContext<TweetsStateModel>, { payload }: AddTweet) {
        const state = getState();
        patchState({
            tweets: [...state.tweets, payload]
        });
    }

    @Action(AverageTweets)
    public averageTweets({ getState, setState }: StateContext<TweetsStateModel>, { payload }: AverageTweets) {
        setState({
            ...getState(),
            average: payload
        });
    }
}
