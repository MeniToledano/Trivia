
import {Component, OnInit} from '@angular/core';
import {Artist} from "./artist.model";
import {ArtistsService} from "../artists.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

    private artists: Artist[] = [];
    private artistAdded = true;
    private artistNameInput: string;
    private albumSrc: string;

    constructor(private artistsService: ArtistsService) {
    }

    ngOnInit() {
        // this.artists = this.artistsService.artists;
        this.artistsService.artistAdded.subscribe(
            (artists: Artist[]) => {
                this.artists = artists;
                this.artistAdded = true;
            }
        );
        this.artistsService.artistAddedSuccessfully.subscribe(
            (isArtistAdded: boolean) => {
                this.artistAdded = isArtistAdded;
            }
        )


    }

    artistNameEvent(event: Event): void {
        this.artistNameInput = (<HTMLInputElement>event.target).value;

        this.artistsService.onAddArtistOnline(this.artistNameInput).then(
            // TODO: use "albumSrc: string" instead of albumSrc
            albumSrc => {
                this.albumSrc = albumSrc;
                console.log("artistNameEvent album src is " + this.albumSrc);
            },
            error => {
                console.error(`Error adding artist...`, error);
            }
        );

    }
}