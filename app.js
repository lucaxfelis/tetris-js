document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');

  const startBtn = document.querySelector('#start-button');
  const ctrlBtn = document.querySelector('#controls-button');
  const pauseBtn = document.querySelector('#pause-button');
  const backBtn = document.querySelector('#back-button');
  const initialBackBtn = document.querySelector('#initial-back-button');
  const difficultBtn = document.querySelector('#difficult-button');
  const easyBtn = document.querySelector('#easy-button');
  const mediumBtn = document.querySelector('#medium-button');
  const hardBtn = document.querySelector('#hard-button');
  const extremeBtn = document.querySelector('#extreme-button');
  const gameoverBtn = document.querySelector('#gameover-button');
  const pointsSpan = document.querySelector('#points');
  const speedSpan = document.querySelector('#speed');
  const finalScoreSpan = document.querySelector('#final-score');

  const initialWindow = document.querySelector('#initial-menu');
  const ctrlWindow = document.querySelector('#controls-menu');
  const difficultWindow = document.querySelector('#difficult-menu'); 
  const difficultDisplay = document.querySelector('#difficult-menu p');
  const pausedWindow = document.querySelector('#paused');
  const gameoverWindow = document.querySelector('#gameover-menu');

  const GRID_WIDTH  = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let speedFactor = 750;
  let points = 10;


  const colors = [
    'url(images/green-block.png)',
    'url(images/blue-block.png)',
    'url(images/orange-block.png)',
    'url(images/purple-block.png)',
    'url(images/yellow-block.png)',
    'url(images/sky-block.png)',
    'url(images/red-block.png)'
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
      squares[currentPosition + index].style.backgroundImage = colors[random];
      squares[currentPosition + index].style.backgroundSize = 'cover';
    })
  }

  // apaga o Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundImage = 'none';
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
      square.classList.remove('tetromino');
      square.style.backgroundImage = 'none';
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
      displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom];
      displaySquares[displayIndex + index].style.backgroundSize = 'cover';
    })
  }

  function clearGrid() {
    for (let index = 0; index <= 199; index++) {
      squares[index].classList.remove('taken');
      squares[index].classList.remove('tetromino');
      squares[index].style.backgroundImage = 'none';
    }
  }

  startBtn.addEventListener('click', () => {
    initialWindow.style.display = 'none';
    draw();
    timerId = setInterval(moveDown, speedFactor);
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    displayShape();
  })

  ctrlBtn.addEventListener('click', () => {
    initialWindow.style.display = 'none';
    ctrlWindow.style.display = 'flex';
  })

  initialBackBtn.addEventListener('click', () => {
    ctrlWindow.style.display = 'none';
    initialWindow.style.display = 'flex';
  })

  difficultBtn.addEventListener('click', () => {
    initialWindow.style.display = 'none';
    difficultWindow.style.display = 'flex';
  })

  easyBtn.addEventListener('mouseover', () => {
    pointsSpan.innerHTML = 5;
    speedSpan.innerHTML = 'lenta';
    difficultDisplay.style.color = '#FFF';
    pointsSpan.style.color = '#ebd500';
    speedSpan.style.color = '#ebd500'; 
  })

  easyBtn.addEventListener('mouseout', () => {
    difficultDisplay.style.color = 'transparent';
    pointsSpan.style.color = 'transparent';
    speedSpan.style.color = 'transparent';
  })

  easyBtn.addEventListener('click', () => {
    points = 5;
    speedFactor = 1000;
    difficultWindow.style.display = 'none';
    initialWindow.style.display = 'flex';
  })

  mediumBtn.addEventListener('mouseover', () => {
    pointsSpan.innerHTML = 10;
    speedSpan.innerHTML = 'moderada';
    difficultDisplay.style.color = '#FFF';
    pointsSpan.style.color = '#ebd500';
    speedSpan.style.color = '#ebd500';
  })

  mediumBtn.addEventListener('mouseout', () => {
    difficultDisplay.style.color = 'transparent';
    pointsSpan.style.color = 'transparent';
    speedSpan.style.color = 'transparent';
  })

  mediumBtn.addEventListener('click', () => {
    points = 10;
    speedFactor = 750;
    difficultWindow.style.display = 'none';
    initialWindow.style.display = 'flex';   
  })

  hardBtn.addEventListener('mouseover', () => {
    pointsSpan.innerHTML = 20;
    speedSpan.innerHTML = 'rápida';  
    difficultDisplay.style.color = '#FFF';
    pointsSpan.style.color = '#ebd500';
    speedSpan.style.color = '#ebd500'; 
  })

  hardBtn.addEventListener('mouseout', () => {
    difficultDisplay.style.color = 'transparent';
    pointsSpan.style.color = 'transparent';
    speedSpan.style.color = 'transparent';
  })

  hardBtn.addEventListener('click', () => {
    points = 20;
    speedFactor = 500;
    difficultWindow.style.display = 'none';
    initialWindow.style.display = 'flex';   
  })

  extremeBtn.addEventListener('mouseover', () => {
    pointsSpan.innerHTML = 30;
    speedSpan.innerHTML = 'muito rápida';
    difficultDisplay.style.color = '#FFF';
    pointsSpan.style.color = '#ebd500';
    speedSpan.style.color = '#ebd500';   
  })

  extremeBtn.addEventListener('mouseout', () => {
    difficultDisplay.style.color = 'transparent';
    pointsSpan.style.color = 'transparent';
    speedSpan.style.color = 'transparent';
  })

  extremeBtn.addEventListener('click', () => {
    points = 30;
    speedFactor = 250;
    difficultWindow.style.display = 'none';
    initialWindow.style.display = 'flex';   
  })

  gameoverBtn.addEventListener('click', () => {
    gameoverWindow.style.display = 'none';
    initialWindow.style.display = 'flex';   
  })

  //add functionality to the button
  pauseBtn.addEventListener('click', () => {
    clearInterval(timerId) 
    timerId = null
    pausedWindow.style.display = 'flex';
  })

  backBtn.addEventListener('click', () => {
    pausedWindow.style.display = 'none';
    draw();
    timerId = setInterval(moveDown, speedFactor);
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    displayShape();
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i += GRID_WIDTH ) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score += points;
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundImage = 'none';
        })
        const squaresRemoved = squares.splice(i,  GRID_WIDTH );
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'fim de jogo';
      clearInterval(timerId)
      finalScoreSpan.innerHTML = score;
      gameoverWindow.style.display = 'flex';
      clearGrid();
      scoreDisplay.innerHTML = 0;
      score = 0;
    }
  }

})