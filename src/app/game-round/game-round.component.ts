import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArtistsService} from "../artists.service";
import {Artist} from "../artist-list/artist.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-game-round',
    templateUrl: './game-round.component.html',
    styleUrls: ['./game-round.component.css']
})
export class GameRoundComponent implements OnInit {

    //game flow data
    private artistsList: Artist[];
    private answers: string[] = [];
    private questionsAsked: number[] = [];
    private src: string;
    private bonusRoundNumber: number;
    @Output() private gameOverEvent = new EventEmitter<number>();
    private bonusQuestion: boolean = false;
    private combo: number = 0;
    private numberOfGuesses = 0;
    private nextQuestion = false;
    private correctAnswer = false;
    private correctChoice: number = -1;
    private random: number[] = [];
    private allIndexesAvailable: number[] = [];
    private roundNumber: number = 1;
    private totalScore: number = 0;
    private outOfGuesses: boolean = false;
    
//random, unrepeated questions data
    private allIndexesAvailable2: number[];
    private artistsListLeft: Artist[];
    private nextQuestion2: number;

    //game const score variables
    private bonusScoreQuestionValue: number;
    private correctOnFirstGuess: number;
    private correctOnSecondGuess: number;
    private correctOnThirdGuess: number;

    constructor(private artistsService: ArtistsService,
                private router: Router) {

    }

    ngOnInit() {
        this.bonusRoundNumber = 7;
        this.bonusScoreQuestionValue = 15;
        this.correctOnFirstGuess = 10;
        this.correctOnSecondGuess = 5;
        this.correctOnThirdGuess = 2;

        this.artistsList = this.artistsService.getArtistsList();
        this.artistsListLeft = this.artistsList;
        this.nextQuestion2 = 1;
        this.allIndexesAvailable2 = [];
        for (let i = 0; i < this.artistsList.length; i++) {
            this.allIndexesAvailable2.push(i);
        }


        this.setGame();
        this.router.navigate(['/game']);
    }

    setGame(): void {
        this.allIndexesAvailable = [];
        this.artistsList = this.artistsService.getArtistsList();
        if (this.questionsAsked.length == 10) {
            this.gameOverEvent.emit(this.totalScore);
        } else {
            this.updateNextRoundData();
        }
        this.correctAnswer = false;
        this.numberOfGuesses = 0;
        this.nextQuestion = false;
    }

    updateNextRoundData(): void {
        this.chooseNextAlbum();

        //set the view
        this.src = this.artistsList[this.correctChoice].albumPath;
        for (let i = 0; i < 5; i++) {
            this.answers[i] = this.artistsList[this.random[i]].name;
        }
    }

    chooseNextAlbum(): void {
        let temp = Math.floor((Math.random() * (this.artistsListLeft.length - this.nextQuestion2)) + 1);
        this.random[4] = this.allIndexesAvailable2[temp];
        this.correctChoice = this.allIndexesAvailable2[temp];
        this.allIndexesAvailable2[temp] = this.allIndexesAvailable2[this.artistsListLeft.length - this.nextQuestion2];
        this.nextQuestion2++;
        this.addRandomArtists();
    }

    addRandomArtists(): void {
        this.allIndexesAvailable = [];
        for (let i = 0; i < this.artistsList.length; i++)
            this.allIndexesAvailable.push(i);

        this.removeElement();

        for (let n = 1; n <= 4; ++n) {
            let temp = Math.floor((Math.random() * (this.artistsList.length - 1 - n)) + 1);
            this.random[n - 1] = this.allIndexesAvailable[temp];
            this.allIndexesAvailable[temp] = this.allIndexesAvailable[this.artistsList.length - 1 - n];
        }

        this.mixTheAnswers();
    }

    removeElement(): void {
        if (this.correctChoice > -1)
            this.allIndexesAvailable.splice(this.correctChoice, 1); // maybe less 1

    }

    mixTheAnswers(): void {
        this.random.sort(() => Math.random() - 0.5);
    }


    checkAnswer(handleUserAnswer: string): void {
        if (this.random[handleUserAnswer] == this.correctChoice.toString()
        ) {
            this.onCorrectAnswer();
        }
        else {
            this.onInCorrectAnswer();
        }
    }

    onInCorrectAnswer(): void {
        if (this.bonusQuestion == true) {   //if bonus question incorrect
            this.bonusQuestion = false;
            this.outOfGuesses = true;
        }
        this.correctAnswer = false;
        this.numberOfGuesses++;
        if (this.numberOfGuesses == 3) {
            this.combo = 0;
            if (this.totalScore > 4)
                this.totalScore -= 5;
            else
                this.totalScore = 0;
            this.outOfGuesses = true;
        }
    }

    onCorrectAnswer(): void {
        this.nextQuestion = true;
        this.correctAnswer = true;

        if (this.bonusQuestion == true) { //if bonus question correct
            this.totalScore += this.bonusScoreQuestionValue;
            this.bonusQuestion = false;
            this.outOfGuesses = true;
        } else {
            this.handleRegularQuestion();
        }
    }

    handleRegularQuestion(): void {
        if (this.numberOfGuesses === 0) {
            this.totalScore += this.correctOnFirstGuess;
            this.combo++;

            if (this.combo % 3 == 0 && this.combo !== 0) {
                this.totalScore += Math.pow(10, (this.combo / 3));
            }
        }
        else if (this.numberOfGuesses === 1) {
            this.combo = 0;
            this.totalScore += this.correctOnSecondGuess;
        } else if (this.numberOfGuesses === 2) {
            this.combo = 0;
            this.totalScore += this.correctOnThirdGuess;
        }

    }

    questionReset(): void {
        this.roundNumber++;
        if (this.roundNumber == this.bonusRoundNumber) {
            this.bonusQuestion = true;
        }
        this.questionsAsked.push(this.correctChoice);
        this.outOfGuesses = false;
        this.setGame();
    }
}
