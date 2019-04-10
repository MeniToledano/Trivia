import {PlayerModule} from "./player.module";

export class HighScoreService {
    private records: PlayerModule[] = [];

    setRecord(player: PlayerModule) {
        this.records.push(player);
    }

    getRecords() {
        return this.records;
    }
}
