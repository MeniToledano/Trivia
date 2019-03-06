import {Component, Input, OnInit} from '@angular/core';
import {PlayerModule} from "./player.module";
import {HighScoreService} from "./HighScoreService.service";

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.css']
})
export class HighScoreComponent implements OnInit {

  @Input() gameResult: number;
  records : PlayerModule[] = [];
  newHighScore : boolean = false;
  showTable:boolean = false;


  constructor(private highScoreService: HighScoreService) {}

  ngOnInit() {
    this.records = this.highScoreService.getRecords();
   this.updateRecords();
  }

    updateRecords(){
    if(this.records.length == 0){ //first record
      this.newHighScore = true;
    }else{
      if(this.gameResult > this.records[0].score)
          this.newHighScore = true;
    }
    }


    addRecord(name : string){
    this.showTable = true;
    const Player = new PlayerModule(name , this.gameResult);
    this.highScoreService.serRecord(Player);
    this.records.sort( function compare( a : PlayerModule  , b : PlayerModule){
      if(a.score > b.score)
        return -1;
      else
        return 1;
    });
    }
}
