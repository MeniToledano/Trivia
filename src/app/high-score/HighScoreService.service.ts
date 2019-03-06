import {PlayerModule} from "./player.module";

export class HighScoreService {
    records: PlayerModule[]= [] ;

    serRecord(player : PlayerModule){
        this.records.push(player);
    }

    getRecords(){
        return this.records;
    }
}