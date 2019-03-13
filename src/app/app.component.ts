import {Component, Output} from '@angular/core';
import {HttpReqService} from "./httpReq.service";
import {ArtistsService} from "./artists.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    private gameStart = false;
    private highScoreTable = false;
    private artistsList = false;

    @Output() private highScore: number = 0;

    constructor(private httpReq: HttpReqService,
                private artistsService: ArtistsService,
                private router : Router) {

        this.initArtistList()

    }

    initArtistList(): void { // first 10 list items
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

    buttonClicked(button: string): void {
        if (button==='newGame' ) {
            this.gameStart = true;
            this.artistsList = false;
            this.highScoreTable = false;
        } else if ( button ==='topPlayers') {

            this.gameStart = false;
            this.artistsList = false;
            this.highScoreTable = true;
            this.highScore = -1;
            this.router.navigate(['/top']);

        } else if ( button ==='addArtists') {

            this.gameStart = false;
            this.artistsList = true;
            this.highScoreTable = false;
            this.router.navigate(['/addArtists']);

        }
    }

    gameOver(score: number): void {
        this.gameStart = false;
        this.highScore = score;
        this.highScoreTable = true;
    }
}
