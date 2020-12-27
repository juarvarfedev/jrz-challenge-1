import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TwitterDataStreamComponent } from './twitter-data-stream/twitter-data-stream.component';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { TweetsState } from './store/tweets/tweets.state';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TweetComponent } from './tweet/tweet.component';


@NgModule({
  declarations: [
    AppComponent,
    TwitterDataStreamComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    NgxsModule.forRoot([
      TweetsState
    ],
      { developmentMode: !environment.production },
    ),
    // NgxsReduxDevtoolsPluginModule.forRoot({
    //   disabled: environment.production
    // }),
    // NgxsLoggerPluginModule.forRoot({
    //   disabled: environment.production
    // })
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
