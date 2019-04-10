import {Component, Input, OnInit} from '@angular/core';
import {PlayerModule} from "./player.module";
import {HighScoreService} from "./high-score.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-high-score',
    templateUrl: './high-score.component.html',
    styleUrls: ['./high-score.component.css']
})
export class HighScoreComponent implements OnInit {

    @Input() gameResult: number;
    private records: PlayerModule[] = [];
    private newHighScore: boolean = false;
    private showTable: boolean;
    private emptyTable: boolean = true;

    constructor(private highScoreService: HighScoreService,
                private router: Router) {
    }

    ngOnInit() {
        this.showTable = false;
        this.router.navigate(['/top']);
        this.records = this.highScoreService.getRecords();

        if (this.gameResult == -1) {
            this.onClickFromMenu(true);
        } else {
            this.onClickFromMenu(false);
        }

    }

    onClickFromMenu(menuClicked: boolean): void {
        if (menuClicked)
            this.showTable = true;
        else
            this.newRecordMessage();
    }

    newRecordMessage(): void {
        if (this.records.length == 0) {
            this.newHighScore = true;
        } else {

            if (this.gameResult > this.records[0].score)
                this.newHighScore = true;
        }
    }


    addRecord(name: string): void {
        this.showTable = true;
        const player = new PlayerModule(name, this.gameResult);
        this.highScoreService.setRecord(player);
        this.emptyTable = false;
        this.sortRecordsBoard();
    }

    sortRecordsBoard(): void {
        this.records.sort((a: PlayerModule, b: PlayerModule) => ((a.score > b.score) ? -1 : 1));
    }
}
