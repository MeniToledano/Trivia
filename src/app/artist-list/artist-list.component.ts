import {Component, OnInit} from '@angular/core';
import {Artist} from "./artist.model";
import {ArtistsService} from "../artists.service";

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
        // onAddArtistOnline returns a Promise, so in order to define what happens when the promise is fulfilled
        // we need to use "then" (+- like subscribe, another topic)
        // and then make the assignment:
        //  this.albumSrc = albumSrc;
        this.artistsService.onAddArtistOnline(this.artistNameInput).then(
          albumSrc => {
            this.albumSrc = albumSrc;
            console.log("artistNameEvent album src is " + this.albumSrc);
          },
          error => {
            console.error(`Error adding artist...`, error);
          }
        );

    }

    addArtists(elem: HTMLInputElement): void {
        this.artistNameInput = elem.value;
        this.artistsService.onAddArtist(this.artistNameInput);
        this.artistNameInput = "";
    }

}
