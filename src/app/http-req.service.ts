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
        // TODO: Note that '+=' is not common for strings interpolation in JS.
        this.tempUrlString += name + "&entity=album&limit=1";
        // TODO: checkout this better approach:
        // TODO: this.tempUrlString  = `${this.urlString}${name}&entity=album&limit=1`;
        return this.http.get(this.tempUrlString);
    }
}
