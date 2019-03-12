import {Artist} from "./artist-list/artist.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpReqService} from "./httpReq.service";
import {Response} from '@angular/http';

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

//
    onAddArtistOnline(artistName2: string): string {
        this.httpReq.getArtists(artistName2).subscribe(
            (response: Response) => {
                const data = response.json();
                if (data.results.length > 0) {
                    console.log("aaa:");
                    this.temp = (data.results)[0].artworkUrl60;
                    return this.temp;
                    //    let artist = new Artist(this.name, this.img);
                    //   this.artists.push(artist);
                    //  this.artistAddedSucesfully.emit(true);
                    //  return this.img.slice();
                } else {
                    this.artistAddedSuccessfully.emit(false);
                    console.log("ccc");
                    return "a";

                }
            },
            (error: Error) => this.artistAddedSuccessfully.emit(false)
        );
        console.log("ddd");
        this.artistAdded.emit(this.artists.slice());
        return this.temp;
        // return 'a';
    }


    onAddArtist(artistName: string): void {
        this.httpReq.getArtists(artistName).subscribe(
            (response: Response) => {
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

    getArtistsList(): Artist[] {
        return this.artists.slice();
    }
}