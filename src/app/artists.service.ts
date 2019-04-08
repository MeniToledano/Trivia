import {Artist} from "./artist-list/artist.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpReqService} from "./http-req.service";
import {Response} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class ArtistsService {
    private artists: Artist[] = [];
    public artistAdded = new EventEmitter<Artist[]>();
    public artistAddedSuccessfully = new EventEmitter<boolean>();
    private name: string;
    private img: string;
    private temp: string;

    constructor(private httpReq: HttpReqService) {
    }

     // note the return type, Promise<string> means SOMEWHEN you will receive a string, when the promise is fulfilled
     // that means, that whoever is going to use this function, needs to know the return data will "take time"
    async onAddArtistOnline(artistName2: string): Promise<string> {
      return <Promise<string>>this.httpReq.getArtists(artistName2).toPromise().then(
        response => {
          const data = response.json();
          if (data.results.length > 0) {
            this.temp = (data.results)[0].artworkUrl60;
            console.log(`returned album name ${this.temp}`);
            // you return "string", but because the function is async, its wrapped inside a Promise
            return this.temp;
          }
        },
        error => {
          console.error(`Error when getting album`, error);
          this.artistAddedSuccessfully.emit(false);
        }
      );

    }


    addArtist(artistName: string): void {
      this.getArtists(artistName).then(
        (artist: Artist) => {
          // I removed all the "parsing" logic to another function, and now the "addArtist" function is more readable.
          this.artists.push(artist);
          this.artistAddedSuccessfully.emit(true);
        },
        error => {
          // TODO: here you will catch "NO_MATCHING_ARTIST_FOUND" error
          console.error(`Error adding artist`, error);
          this.artistAddedSuccessfully.emit(false);
        }
      );

        this.httpReq.getArtists(artistName).subscribe(
            (response: Response) => {
                console.log("response:" + response);
                const data = response.json();
                console.log(data);
                if (data.results.length > 0) {
                    this.name = (data.results)[0].artistName;
                    this.img = (data.results)[0].artworkUrl60;
                    const artist = new Artist(this.name, this.img);
                    this.artists.push(artist);
                    this.artistAddedSuccessfully.emit(true);
                } else {
                    this.artistAddedSuccessfully.emit(false);
                }
            },
            (error) => this.artistAddedSuccessfully.emit(false)
        );
        this.artistAdded.emit(this.artists.slice());
    }

    async getArtists(artistName: string): Promise<Artist> {
      return this.httpReq.getArtists(artistName).toPromise().then(
        (response: Response) => {
          const data = response.json();
          console.log(`received raw data`, data);
          if (data.results.length > 0) {
            this.name = (data.results)[0].artistName;
            this.img = (data.results)[0].artworkUrl60;
            const artist = new Artist(this.name, this.img);
            return artist;
          }
          else {
              this.artistAddedSuccessfully.emit(false);
            throw new Error('NO_MATCHING_ARTIST_FOUND');
          }
        },
        (error) => {
          // TODO: this is not necessarily a good practice, just didnt want to change your code much
            this.artistAddedSuccessfully.emit(false);
            throw new Error('NO_MATCHING_ARTIST_FOUND');

        }
      );
    }

    getArtistsList(): Artist[] {
        return this.artists.slice();
    }
}
