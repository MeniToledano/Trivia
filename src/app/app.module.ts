import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import {HttpReqService} from "./httpReq.service";
import { ArtistsService } from "./artists.service";
import { ArtistListComponent } from './artist-list/artist-list.component';

import { GameRoundComponent } from './game-round/game-round.component';
import { HighScoreComponent } from './high-score/high-score.component';
import {HighScoreService} from "./high-score/HighScoreService.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent,
    GameRoundComponent,
    HighScoreComponent,
  ],
  imports: [
    BrowserModule,
      HttpModule,
      FormsModule

  ],
  providers: [ HttpReqService, ArtistsService, HighScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
