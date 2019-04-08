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

    private artistsList: Artist[];
    private answers: string[] = [];
    private questions: number[] = [];
    private src: string;

    @Output() private gameOverEvent = new EventEmitter<number>();
    private bonusQuestion: boolean = false;
    private combo: number = 0;
    private wrongAnswer = false;
    private numberOfGuesses = 0;
    private nextQuestion = false;
    private correctAnswer = false;
    private correctChoice: number = -1;
    private random: number[] = [];
    private mixedAnswersArray: number[] = [];
    private allIndexesAvailable: number[] = [];
    private roundNumber: number = 1;
    private totalScore: number = 0;
    private outOfGuesses: boolean = false;


    constructor(private artistsService: ArtistsService,
                private router: Router) {

    }

    ngOnInit() {
        this.setGame();
        this.router.navigate(['/game']);
    }

    setGame(): void {
        this.artistsList = this.artistsService.getArtistsList();
        if (this.questions.length == 10) {
            //  this.gameOver = true;
            this.gameOverEvent.emit(this.totalScore);
        } else {
            do {
                this.mixTheAnswers();
            } while (this.questions.includes(this.correctChoice))

            console.log("answer 1 = " + this.random[0]);
            console.log("answer 2 = " + this.random[1]);
            console.log("answer 3 = " + this.random[2]);
            console.log("answer 4 = " + this.random[3]);
            console.log("answer 5 = " + this.random[4]);
            console.log("Correct = " + this.correctChoice);
            //set the view
            this.src = this.artistsList[this.correctChoice].albumPath;
            for (let i = 0; i < 5; i++) {
                this.answers[i] = this.artistsList[this.random[i]].name;
            }
        }
        this.correctAnswer = false;
        this.wrongAnswer = false;
        this.numberOfGuesses = 0;
        this.nextQuestion = false;
    }

    // TODO: it looks like this.random shouldn't be an array? because you dont use it after the push
    // Meni: i do use the random array when updating the answers in setGame


    mixTheAnswers(): void {
        this.mixedAnswersArray = [];
        this.allIndexesAvailable = [];

        for (let i = 0; i < this.artistsList.length; i++)
            this.allIndexesAvailable.push(i);

        for (let n = 1; n <= 5; ++n) {
            let temp = Math.floor((Math.random() * (this.artistsList.length - n)) + 1);
            this.random[n - 1] = this.allIndexesAvailable[temp];
            this.mixedAnswersArray.push(this.allIndexesAvailable[temp]);
            this.allIndexesAvailable[temp] = this.allIndexesAvailable[this.artistsList.length - n];
        }

        this.correctChoice = this.mixedAnswersArray[Math.floor(Math.random() * 5)];
    }

    checkAnswer(handleUserAnswer: string): void {
        if (this.random[handleUserAnswer] == this.correctChoice.toString()) {       //correct

            this.nextQuestion = true;
            // TODO: you don't need both correctAnswer and wrongAnswer..
            this.wrongAnswer = false;
            this.correctAnswer = true;

            if (this.bonusQuestion == true) { //if bonus question correct
                this.totalScore += 15;
                this.bonusQuestion = false;
                this.outOfGuesses = true;
            } else {                           //not bonus
                if (this.numberOfGuesses == 0) {
                    this.totalScore += 10;
                    this.combo++;

                    console.log("Combo = " + this.combo);
                    if (this.combo % 3 == 0 && this.combo !== 0) {
                        this.totalScore += Math.pow(10, (this.combo / 3));
                    }

                } else if (this.numberOfGuesses == 1) {
                    this.combo = 0;
                    this.totalScore += 5;
                } else if (this.numberOfGuesses == 2) {
                    this.combo = 0;
                    this.totalScore += 2;
                }
            }
        } else {                 //mistake

            if (this.bonusQuestion == true) {   //bonus mistaken
                this.bonusQuestion = false;
                this.outOfGuesses = true;
            }

            this.correctAnswer = false;
            this.wrongAnswer = true;
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
    }

    questionReset(): void {
        this.roundNumber++;

        if (this.roundNumber == 7) {
            this.bonusQuestion = true;
        }

        this.questions.push(this.correctChoice);
        this.outOfGuesses = false;
        this.setGame();
    }
}
