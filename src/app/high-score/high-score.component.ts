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
        console.log("this.gameResult= "+this.gameResult);
if(this.gameResult !== -1){
    this.updateRecords();
}else{
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
        const Player = new PlayerModule(name, this.gameResult);
        this.highScoreService.serRecord(Player);
        this.records.sort(function compare(a: PlayerModule, b: PlayerModule) {
            if (a.score > b.score)
                return -1;
            else
                return 1;
        });
    }
}
