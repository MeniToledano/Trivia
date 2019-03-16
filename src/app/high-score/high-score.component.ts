import {Component, Input, OnInit} from '@angular/core';
import {PlayerModule} from "./player.module";
import {HighScoreService} from "./HighScoreService.service";

@Component({
    selector: 'app-high-score',
    templateUrl: './high-score.component.html',
    styleUrls: ['./high-score.component.css']
})
export class HighScoreComponent implements OnInit {

    @Input()  gameResult: number;
    private records: PlayerModule[] = [];
    private newHighScore: boolean = false;
    private showTable: boolean = false;


    constructor(private highScoreService: HighScoreService) {
    }

    ngOnInit() {
        this.records = this.highScoreService.getRecords();
        console.log("this.gameResult= " + this.gameResult);
        // TODO: its not very clear what you are doing here... a comparison to -1?
        if (this.gameResult !== -1) {
          // TODO: update records with what?
            this.updateRecords();
        } else {
            this.showTable = true;
        }
    }

    updateRecords(): void {
        if(this.records.length == 0){
            this.newHighScore = true;
        } else {
            if (this.gameResult > this.records[0].score)
                this.newHighScore = true;
        }
    }


    addRecord(name: string): void {
        this.showTable = true;
        // TODO: all params should be formatter with camelCase. in your case: const player;
        const Player = new PlayerModule(name, this.gameResult);
        this.highScoreService.serRecord(Player);
        // TODO: this sorts the records. should be a separate function.
        // also, you called the function "compare", but this is an anonymous function!
        // this.records.sort(function compare(a: PlayerModule, b: PlayerModule) {
        //     if (a.score > b.score)
        //         return -1;
        //     else
        //         return 1;
        // });
        this.sortRecordsBoard();
    }

    // TODO: i added this function because the way the SORT is made, is not important for 'addRecord'
    // you should separate different implementations and use it within different functions.
    sortRecordsBoard(): void {
      this.records.sort((a: PlayerModule, b: PlayerModule) => ((a.score > b.score) ? -1 : 1));
    }
}
