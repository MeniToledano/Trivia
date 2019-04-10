import {Component, OnInit, Output} from '@angular/core';
import {HttpReqService} from "./http-req.service";
import {ArtistsService} from "./artists.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    private gameStart = false;
    private highScoreTable = false;
    private artistsList = false;

    @Output() private highScore: number = 0;

    constructor(private httpReq: HttpReqService,
                private artistsService: ArtistsService,
                private router: Router) {

        this.initArtistList()

    }

    initArtistList(): void { // first 10 list items
        this.artistsService.addArtist("RHCP");
        this.artistsService.addArtist("Queen");
        this.artistsService.addArtist("AC/DC");
        this.artistsService.addArtist("The Beatles");
        this.artistsService.addArtist("The Who");
        this.artistsService.addArtist("Led Zeppelin");
        this.artistsService.addArtist("Metallica");
        this.artistsService.addArtist("The Rolling Stones");
        this.artistsService.addArtist("Fleetwood Mac");
        this.artistsService.addArtist("Aerosmith");
        this.artistsService.addArtist("Rihana");
        this.artistsService.addArtist("Eminem");
    }

    buttonClicked(button: string): void {
        if (button === 'newGame') {
            this.gameStart = true;
            this.artistsList = false;
            this.highScoreTable = false;
            //         this.router.navigate(['/game']);
        } else if (button === 'topPlayers') {

            this.gameStart = false;
            this.artistsList = false;
            this.highScoreTable = true;
            this.highScore = -1;
            //    this.router.navigate(['/top']);

        } else if (button === 'addArtists') {

            this.gameStart = false;
            this.artistsList = true;
            this.highScoreTable = false;
            //     this.router.navigate(['/addArtists']);

        }
    }

    gameOver(score: number): void {
        this.gameStart = false;
        this.highScore = score;
        this.highScoreTable = true;
    }

    ngOnInit(): void {
        this.router.navigate(['']);
    }
}
