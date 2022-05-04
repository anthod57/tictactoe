import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  squares: any[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  draw: boolean

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() : void {
    this.currentPlayer = 'X';
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.draw = false;
  } 

  playMove(index: number) : void {
    if(!this.squares[index] && !this.winner){
      this.squares.splice(index, 1, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === "X" ? 'O' : 'X';
    }

    if(!this.squares.includes(null)){
      this.draw = true;
    }else{
      this.winner = this.calculateWinner();  
    }
  }

  calculateWinner(){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }

    return null;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3];

    if(keys.includes(parseInt(event.key))){
      const cell = cells[keys.indexOf((parseInt(event.key)))]
      this.playMove(cell);
    }
  }
}
