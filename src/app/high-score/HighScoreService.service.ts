import {PlayerModule} from "./player.module";

export class HighScoreService {
    // TODO: you should set 'records' to be private, so ONLY setRecord and getRecord can access it
    records: PlayerModule[] = [];

    serRecord(player: PlayerModule) {
        this.records.push(player);
    }

    getRecords() {
        return this.records;
    }
}
