import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArtistsService} from "../artists.service";
import {Artist} from "../artist-list/artist.model";

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
    // TODO: i dont know what arr means or what it holds
    private arr = [];

    private roundNumber: number = 1;
    private totalScore: number = 0;
    private outOfGuesses: boolean = false;


    constructor(private artistsService: ArtistsService) {

    }

    ngOnInit() {
        this.setGame();
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
            this.answers[0] = this.artistsList[this.random[0]].name;
            this.answers[1] = this.artistsList[this.random[1]].name;
            this.answers[2] = this.artistsList[this.random[2]].name;
            this.answers[3] = this.artistsList[this.random[3]].name;
            this.answers[4] = this.artistsList[this.random[4]].name;
        }
        this.correctAnswer = false;
        this.wrongAnswer = false;
        this.numberOfGuesses = 0;
        this.nextQuestion = false;
    }

  // TODO: look at this function, it does the same for 5 times. maybe use a loop instead of repeating yourself?
    mixTheAnswers(): void {
        this.arr = [];
        // TODO: it looks like this.random shouldn't be an array? because you dont use it after the push
        this.random[0] = Math.floor(Math.random() * this.artistsList.length);
        this.arr.push(this.random[0]);

        do {
          // TODO: WARNING! do/while is very dangerous in JS. what happens if this.arr.includes(this.random[1]) === true forever?
          // can that happen?
          // its better to think about a loop which is FINAL for sure.
            this.random[1] = Math.floor(Math.random() * this.artistsList.length);
        } while (this.arr.includes(this.random[1]));
        this.arr.push(this.random[1]);

        do {
            this.random[2] = Math.floor(Math.random() * this.artistsList.length);
        } while (this.arr.includes(this.random[2]));
        this.arr.push(this.random[2]);

        do {
            this.random[3] = Math.floor(Math.random() * this.artistsList.length);
        } while (this.arr.includes(this.random[3]));
        this.arr.push(this.random[3]);

        do {
            this.random[4] = Math.floor(Math.random() * this.artistsList.length);
        } while (this.arr.includes(this.random[4]));
        this.arr.push(this.random[4]);

        this.correctChoice = this.arr[Math.floor(Math.random() * 5)];


    }

    // TODO: a better name would be "handleUserAnswer", because you dont only check the answer, you also DO stuff.
    checkAnswer(answer: string): void {
        if (this.random[answer] == this.correctChoice.toString()) {       //correct

            this.nextQuestion = true;
            // TODO: you don't need both correctAnswer and wrongAnswer..
            this.wrongAnswer = false;
            this.correctAnswer = true;

            // TODO: you wrote "bonus if correct answer", then why it is not:
            // if (this.correctAnswer) ?
            if (this.bonusQuestion == true) { //bonus if correct answer
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
