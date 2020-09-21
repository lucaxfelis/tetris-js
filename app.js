document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const GRID_WIDTH  = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;

  const colors = [
    'orange',
    'pink',
    'red',
    'teal',
    'purple',
    'green',
    'blue'
  ];

  // os Tetrominos
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH,  GRID_WIDTH + 1,  GRID_WIDTH + 2,  GRID_WIDTH * 2 + 2],
    [1,  GRID_WIDTH + 1,  GRID_WIDTH * 2 + 1,  GRID_WIDTH * 2],
    [GRID_WIDTH,  GRID_WIDTH * 2,  GRID_WIDTH * 2 + 1,  GRID_WIDTH * 2 + 2]
  ];

  const lTetrominoInverted = [
    [0, 1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH,  GRID_WIDTH + 1,  GRID_WIDTH + 2, 2],
    [1,  GRID_WIDTH + 1,  GRID_WIDTH * 2 + 1,  GRID_WIDTH * 2 + 2],
    [GRID_WIDTH * 2,  GRID_WIDTH,  GRID_WIDTH + 1,  GRID_WIDTH + 2],
  ];

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1,  GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH , GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1,  GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ];

  const zTetrominoInverted = [
    [2, GRID_WIDTH + 2, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH,  GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    [2, GRID_WIDTH + 2, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH,  GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2] 
   ];

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ];

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ];

  const theTetrominoes = [lTetromino, 
  	lTetrominoInverted, 
  	zTetromino,
  	zTetrominoInverted, 
  	tTetromino, 
  	oTetromino, 
  	iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  // seleciona um Tetromino aleatoriamente em sua primeira rotação
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  // desenha os Tetrominos
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    })
  }

  // apaga o Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';

    })
  }

  // determina funções para as key codes
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

  // função de mover para baixo
  function moveDown() {
    undraw();
    currentPosition +=  GRID_WIDTH;
    draw();
    freeze();
  }

  // função de congelar
  function freeze() {
    if(current.some(index => squares[currentPosition + index +  GRID_WIDTH ].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      // iniciar a queda de um novo Tetromino
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // move o tetromino para a esquerda, a não ser que ele esteja numa borda ou num bloqueio
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) %  GRID_WIDTH === 0);
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }

  // move o tetromino para a direita, a não ser que ele esteja numa borda ou num bloqueio
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index + 1) %  GRID_WIDTH === 0);
    if (!isAtRightEdge) {
      currentPosition += 1;
    }
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  
  /// corrige a rotação dos Tetrominos na borda 
  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % GRID_WIDTH === 0);  
  }
  
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % GRID_WIDTH === 0);
  }
  
  function checkRotatedPosition(P){
    P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
    if ((P+1) %  GRID_WIDTH  < 4) {         //add 1 because the position index can be 1 less than where the piece is ( GRID_WIDTH how they are indexed).     
      if (isAtRight()){            //use actual position to check if it's flipped over to right side
        currentPosition += 1    //if so, add one to wrap it back around
        checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
        }
    }
    else if (P %  GRID_WIDTH  > 5) {
      if (isAtLeft()){
        currentPosition -= 1
      checkRotatedPosition(P)
      }
    }
  }
  
  // roda o tetromino
  function rotate() {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }

  // mostra o próximo tetromino no mini display 
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const DISPLAY_WIDTH  = 4
  const displayIndex = 0


  //the Tetrominos  GRID_WIDTH ut rotations
  const upNextTetrominoes = [
    [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, 2], //lTetromino
    [0, 1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1], //lTetrominoInverted
    [0, DISPLAY_WIDTH , DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1], //zTetromino
    [2, DISPLAY_WIDTH + 2, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1], //zTetrominoInverted
    [1, DISPLAY_WIDTH , DISPLAY_WIDTH + 1, DISPLAY_WIDTH + 2], //tTetromino
    [0, 1, DISPLAY_WIDTH , DISPLAY_WIDTH + 1], //oTetromino
    [1, DISPLAY_WIDTH +1, DISPLAY_WIDTH * 2 + 1, DISPLAY_WIDTH * 3 + 1] //iTetromino
  ];

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  //add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i += GRID_WIDTH ) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i,  GRID_WIDTH )
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'fim de jogo'
      clearInterval(timerId)
    }
  }

})