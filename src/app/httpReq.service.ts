import {Http} from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpReqService {
    urlString: string = 'https://itunes.apple.com/search?term=';
    tempUrlString: string;

    constructor(private http: Http) {
    }

    getArtists(name: string) {
        this.tempUrlString = this.urlString;
        this.tempUrlString += name + "&entity=album&limit=1";
        //   this.tempUrlString += name ;
        return this.http.get(this.tempUrlString);
    }
}