import {Http} from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpReqService {
    BASE_URL: string = 'https://itunes.apple.com/search?term=';
    tempUrlString: string;

    constructor(private http: Http) {
    }

    getArtists(name: string) {
        this.tempUrlString = this.BASE_URL;
        this.tempUrlString = this.tempUrlString + name + "&entity=album&limit=1";

        return this.http.get(this.tempUrlString);
    }
}
