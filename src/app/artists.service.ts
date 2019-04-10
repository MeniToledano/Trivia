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
                this.artists.push(artist);
                this.artistAddedSuccessfully.emit(true);
            },
            error => {
                this.artistAddedSuccessfully.emit(false);
                console.error(`Error adding artist`, error);
            }
        );
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
                this.artistAddedSuccessfully.emit(false);
                throw new Error('NO_MATCHING_ARTIST_FOUND');

            }
        );
    }

    getArtistsList(): Artist[] {
        return this.artists.slice();
    }
}
