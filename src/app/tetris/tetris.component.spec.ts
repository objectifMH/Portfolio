import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisComponent } from './tetris.component';

describe('TetrisComponent', () => {
  let component: TetrisComponent;
  let fixture: ComponentFixture<TetrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TetrisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




// if (event.key === "ArrowRight") {
//   console.log("Droit");

//   // let right = true;
//   // let block_down = false;
//   // this.current.forEach(element => {
//   //   if ((element + this.currentPosition + 2) % this.width - 1 === 0) {
//   //     right = false;
//   //   }
//   // });

//   // let isRight = false;
//   // this.current.forEach(element => {
//   //   isRight = this.squares[element + this.currentPosition + 2].classList.contains("block_down");


//   //   console.log(this.current[element]);
//   //   this.squares[element].style.background = 'orange';
//   //   this.squares[element + this.currentPosition + 2].style.backgroundColor = "grey";

//   // });

//   // this.currentPosition = right && !isRight  ? this.currentPosition + 1 : this.currentPosition;
//   let isR = this.currentTetromino.some( (element, index) =>
//     ((index + this.currentPosition) % this.width === 0)
//   )
//   console.log(isR);
//   this.currentPosition = isR ? this.currentPosition : this.currentPosition + 1;
//   //this.currentPosition = this.currentPosition + 1;
// }

// if (event.key === "ArrowLeft") {

//   console.log("Gauche");
//   // let left = true;
//   // this.current.forEach(element => {
//   //   if ((element + this.currentPosition) % this.width === 0) {
//   //     left = false;
//   //   }
//   // });


//   //  let isLeft = false;
//   //  this.current.forEach(element => {
//   //  isLeft = this.squares[element + this.currentPosition - 1].classList.contains("block_down");
//   //  this.squares[element + this.currentPosition - 1].style.backgroundColor = "grey";
//   //  });

//   //  this.currentPosition = left && !isLeft ? this.currentPosition -1 : this.currentPosition;
//   // let isL = this.currentTetromino.some((element, index) =>
//   //   ((index + this.currentPosition) % this.width === 0)
//   // )
//   // console.log(isL);
//   // this.currentPosition = isL ? this.currentPosition : this.currentPosition - 1;
// }

// if (event.key === "ArrowUp") {
//   this.currentTetromino = this.rotateTetromino();
// }

// if (event.key === "ArrowDown") {
//   let down = false;
//   this.currentTetromino.forEach(element => {
//     down = this.allDiv[element + this.currentPosition + this.width].classList.contains("block_down");
//     this.allDiv[element + this.currentPosition + this.width].style.backgroundColor = "grey";
//   });
//   if (!down) {
//     this.currentPosition = this.currentPosition + this.width;
//   }
//   else {
//     this.currentPosition = this.currentPosition - this.width;
//   }
// }
// }