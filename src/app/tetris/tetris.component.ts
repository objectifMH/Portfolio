import { ThrowStmt } from '@angular/compiler';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { right } from '@popperjs/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit {


  width = 10;
  height = 20;
  grid;
  allDiv = [];
  colors = ["turquoise", "red", "grey", "orange", "purple"];
  random;

  //The Tetrominos L, Z, T, O
  lTetromino = [
    [1, this.width + 1, this.width * 2 + 1, 2],
    [this.width, this.width + 1, this.width + 2, this.width + 2, this.width * 2 + 2],
    [1, this.width + 1, this.width * 2 + 1, this.width * 2],
    [this.width, this.width * 2, this.width * 2 + 1, this.width * 2 + 2]
  ];

  zTetromino = [
    [0, this.width, this.width + 1, this.width * 2 + 1],
    [this.width + 1, this.width + 2, this.width * 2, this.width + 2, this.width * 2 + 1],
    [0, this.width, this.width + 1, this.width * 2 + 1],
    [this.width + 1, this.width + 2, this.width * 2, this.width * 2 + 1]
  ];

  tTetromino = [
    [1, this.width, this.width + 1, this.width + 2],
    [1, this.width + 1, this.width + 2, this.width * 2 + 1],
    [this.width, this.width + 1, this.width + 2, this.width * 2 + 1],
    [1, this.width, this.width + 1, this.width * 2 + 1]
  ];

  oTetromino = [
    [0, 1, this.width, this.width + 1],
    [0, 1, this.width, this.width + 1],
    [0, 1, this.width, this.width + 1],
    [0, 1, this.width, this.width + 1],
  ];

  iTetromino = [
    [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
    [this.width, this.width + 1, this.width + 2, this.width + 3],
    [1, this.width + 1, this.width * 2 + 1, this.width * 3 + 1],
    [this.width, this.width + 1, this.width + 2, this.width + 3],
  ];

  TheTetrominos = [this.lTetromino, this.zTetromino, this.tTetromino, this.oTetromino, this.iTetromino];
  currentTetromino;
  currentPosition = 0;
  currentRotation = 0;

  constructor() { }

  ngOnInit(): void {
    this.grid = document.querySelector('.grid');
    this.allDiv = Array.from(this.grid.querySelectorAll('div'));
    this.currentTetromino = this.getTetromino(0);
    setInterval(() => {
      this.moveDown();
    }, 1000)

  }

  getTetromino(currentRotation) {
    this.currentRotation = currentRotation;
    this.random = Math.floor(Math.random() * this.TheTetrominos.length);
    return this.TheTetrominos[this.random][this.currentRotation];
  }

  rotateTetromino() {
    //TheTetrominos = [this.lTetromino, this.zTetromino, this.tTetromino, this.oTetromino, this.iTetromino];
    // this.currentRotation === 3 ? this.currentRotation = 0 : this.currentRotation = this.currentRotation + 1;
    // console.log(0, this.currentRotation);
    // return this.TheTetrominos[0][this.currentRotation];
    let isAtLeftEdge = this.currentTetromino.some((index, pos) => (this.currentPosition + index) % this.width === 0);
    let isAtRightEdge = this.currentTetromino.some((index, pos) => (this.currentPosition + index) % this.width === this.width - 1);
   
    if(!isAtLeftEdge && !isAtRightEdge){
      this.currentRotation++
      if (this.currentRotation === this.currentTetromino.length) {
        this.currentRotation = 0
      }
      this.currentTetromino = this.TheTetrominos[this.random][this.currentRotation]
      
    }
    return this.currentTetromino;
  }

  draw() {
    this.currentTetromino.forEach(element => {
      this.allDiv[this.currentPosition].style.backgroundColor = "green";
      this.allDiv[this.currentPosition].innerHTML = this.currentPosition;
      this.allDiv[element + this.currentPosition].classList.add("block");
      this.allDiv[element + this.currentPosition].style.backgroundColor = this.colors[this.random];
      this.allDiv[element + this.currentPosition].innerHTML = this.currentPosition + element;
      this.allDiv[element + this.currentPosition].style.backgroundColor = 'white';
      //console.log(this.squares[element + this.currentPosition], this.colors[this.random]);
    });
  }

  undraw() {

    this.allDiv.forEach(element => {
      element.classList.remove("block");
      if (element.classList.contains("block_down")) {
        element.style.background = "black";
      }
      else {
        element.innerHTML = "";
        element.style.background = "yellowgreen";
      }
    });
  }

  moveDown() {
    this.undraw();
    this.currentPosition = this.currentPosition + this.width;
    this.draw();
    this.freeze();
  }

  freeze() {

    let isDown = false;
    this.currentTetromino.forEach(element => {
      isDown = this.allDiv[element + this.currentPosition + this.width].classList.contains("block_down");
      if (isDown) {
        this.currentTetromino.forEach(element => {
          this.allDiv[element + this.currentPosition].classList.add("block_down");
        })

        this.currentTetromino = this.getTetromino(0);
        this.currentPosition = 4;
      }
    });

  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === "ArrowRight") {
      console.log("Droit");

      let isR = this.currentTetromino.some( (element, index) => 
        ((element + this.currentPosition) % (this.width)  === 9 )
      )
      console.log(isR, this.currentPosition) ;
      if ( isR)
      {
        this.currentTetromino.forEach( (element, index) => {
          this.allDiv[element + this.currentPosition].style.backgroundColor = 'yellow';
          console.log(index + this.currentPosition, index, this.currentPosition, element);
        });
      }
      this.currentPosition = isR ? this.currentPosition : this.currentPosition + 1;
      if ( this.currentTetromino.some(
        element => this.allDiv[element + this.currentPosition].classList.contains('block_wall')))
        {
          this.currentPosition--;
        }
    }

    if (event.key === "ArrowLeft") {

      console.log("Gauche");
      let isL = this.currentTetromino.some( (element, index) =>
        ((element + this.currentPosition) % this.width === 0)
      )
      console.log(isL);
      if ( isL)
      {
        this.currentTetromino.forEach(element => {
          this.allDiv[element + this.currentPosition].style.backgroundColor = 'turquoise';
        });
      }
      this.currentPosition = isL ? this.currentPosition : this.currentPosition - 1;
      if ( this.currentTetromino.some(
            element => this.allDiv[element + this.currentPosition].classList.contains('block_wall')))
            {
              this.currentPosition++;
            }
      
    }

    if (event.key === "ArrowUp") {
      this.currentTetromino = this.rotateTetromino();
    }

    if (event.key === "ArrowDown") {
      let down = false;
      this.currentTetromino.forEach(element => {
        down = this.allDiv[element + this.currentPosition + this.width].classList.contains("block_down");
        this.allDiv[element + this.currentPosition + this.width].style.backgroundColor = "grey";
      });
      if (!down) {
        this.currentPosition = this.currentPosition + this.width;
      }
      else {
        this.currentPosition = this.currentPosition - this.width;
      }
    }
  }
}

