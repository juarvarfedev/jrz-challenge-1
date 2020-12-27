import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import * as Pubnub from 'pubnub';
import { AddTweet } from '../store/tweets/tweets.actions';
import { Tweet } from '../store/tweets/tweets.model';

@Injectable({
  providedIn: 'root'
})
export class TwitterDataStreamService {
  private pubnub = new Pubnub({
    subscribeKey: "sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe",
  });

  constructor(private store:Store) {}

  private addDataToList(data: Tweet): void {
      this.store.dispatch(new AddTweet(data));
  }

  public getTweets(): void {
    this.pubnub.addListener({
      message: (message:any) => {
        const data = JSON.parse(JSON.stringify(message)).message;
        const fetchData: Tweet = {
          text: data.text,
          name: data.user.name,
          screenName: data.user.screen_name,
          country: data.place.country,
          countryCode: data.place.country_code,
          backgroundColor: `#${data.user.profile_background_color}`,
          textColor: `#${data.user.profile_text_color}`,
          profileImage: data.user.profile_image_url
        };
        this.addDataToList(fetchData);
      }
    })
  }

  public subscribeTwitterStream() {
    this.pubnub.subscribe({
      channels: ["pubnub-twitter"]
    });
  }

}
