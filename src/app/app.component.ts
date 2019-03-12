import {Component, Output} from '@angular/core';
import {HttpReqService} from "./httpReq.service";
import {ArtistsService} from "./artists.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    private gameStart = false;
    private highScoreTable = false;
    @Output() private highScore: number = 0;

    constructor(private httpReq: HttpReqService,
                private artistsService: ArtistsService) {

        this.initArtistList()

    }

    initArtistList() : void { // first 10 list items
        this.artistsService.onAddArtist("RHCP");
        this.artistsService.onAddArtist("Queen");
        this.artistsService.onAddArtist("AC/DC");
        this.artistsService.onAddArtist("The Beatles");
        this.artistsService.onAddArtist("The Who");
        this.artistsService.onAddArtist("Led Zeppelin");
        this.artistsService.onAddArtist("Metallica");
        this.artistsService.onAddArtist("The Rolling Stones");
        this.artistsService.onAddArtist("Fleetwood Mac");
        this.artistsService.onAddArtist("Aerosmith");
    }

    gameOver(score: number): void {
        this.gameStart = false;
        this.highScore = score;
        this.highScoreTable = true;
    }
}
