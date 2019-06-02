import {PlayerModel} from "./player.model";

export class HighScoreService {
    private records: PlayerModel[] = [];

    setRecord(player: PlayerModel) {
        this.records.push(player);
    }

    getRecords() {
        return this.records;
    }
}
