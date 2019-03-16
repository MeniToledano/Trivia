import {Http} from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpReqService {
  // TODO: change name: urlString -> const BASE_URL. (caps means its not going to change or be overridden)
    urlString: string = 'https://itunes.apple.com/search?term=';
    tempUrlString: string;

    constructor(private http: Http) {
    }

    getArtists(name: string) {
        this.tempUrlString = this.urlString;
        // TODO: Note that '+=' is not common for strings interpolation in JS.
        this.tempUrlString += name + "&entity=album&limit=1";
        // TODO: checkout this better approach:
        // TODO: this.tempUrlString  = `${this.urlString}${name}&entity=album&limit=1`;
        return this.http.get(this.tempUrlString);
    }
}
