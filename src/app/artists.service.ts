import {Artist} from "./artist-list/artist.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpReqService} from "./httpReq.service";

@Injectable()
export class ArtistsService {
    artists : Artist[] = [];
    artistAdded = new EventEmitter<Artist[]>();
    artistAddedSucesfully = new EventEmitter<boolean>();
    name: string;
    img: string;

constructor(private httpReq : HttpReqService){}


    onAddArtist(artistName : string)
    {
        this.httpReq.getArtists(artistName).subscribe(
            (response: Response) => {
                const data = response.json();
                console.log(data);
                if(data.results.length > 0) {
                     this.name = (data.results)[0].artistName;
                     this.img = (data.results)[0].artworkUrl60;
                     const artist = new Artist(this.name, this.img);
                     this.artists.push(artist);
                    this.artistAddedSucesfully.emit(true);
                }else{
                    this.artistAddedSucesfully.emit(false);
                }
            },
            (error) => this.artistAddedSucesfully.emit(false)
        );
        this.artistAdded.emit(this.artists.slice());
    }

    getArtistsList(){
    return this.artists.slice();
    }
}