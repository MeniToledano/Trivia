import { Component, OnInit } from '@angular/core';
import {Artist} from "./artist.model";
import {ArtistsService} from "../artists.service";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

    artists : Artist[] = [];
    artistAdded = true;
  constructor(private artistsService : ArtistsService) { }

  ngOnInit() {
     // this.artists = this.artistsService.artists;
       this.artistsService.artistAdded.subscribe(
          (artists: Artist[]) => {
              this.artists = artists;
              this.artistAdded = true;
          }
      );
       this.artistsService.artistAddedSucesfully.subscribe(
           (error : boolean) => {
               this.artistAdded = error;
           }
       )


  }

  addArtists(any : any) {
      this.artistsService.onAddArtist(any.value);
      any.value="";
  }

}
