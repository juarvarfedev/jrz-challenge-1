import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
// import { TweetsStateModel } from './tweets.model';
import { AddTweet } from './tweets.actions';
import { Tweet } from './tweets.model';


export interface TweetsStateModel {
    tweets: Tweet[];
}
@State<TweetsStateModel>({
    name: 'tweets',
    defaults: {
        tweets: []
    }
})

@Injectable()
export class TweetsState {
    @Action(AddTweet)
    public addTweet({ getState, patchState, setState }: StateContext<TweetsStateModel>, { payload }: AddTweet) {
        const state = getState();
        // setState({
        //     ...getState(),
        //     tweets: [
        //         ...state.tweets,
        //       // this is the new ZebraFood instance that we add to the state
        //         payload
        //     ]
        patchState({
            tweets: [...state.tweets, payload]
        });
    }
}
