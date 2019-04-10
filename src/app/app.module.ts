import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";
import {HttpReqService} from "./http-req.service";
import {ArtistsService} from "./artists.service";
import {ArtistListComponent} from './artist-list/artist-list.component';

import {GameRoundComponent} from './game-round/game-round.component';
import {HighScoreComponent} from './high-score/high-score.component';
import {HighScoreService} from "./high-score/high-score.service";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
    // { path: '' , component: AppComponent },
    {path: 'top', component: HighScoreComponent},
    {path: 'addArtists', component: ArtistListComponent},
    {path: 'game', component: GameRoundComponent}
];

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
        FormsModule,
        RouterModule.forRoot(appRoutes)

    ],
    providers: [HttpReqService, ArtistsService, HighScoreService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
