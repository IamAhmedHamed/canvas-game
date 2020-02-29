// IFEE
(function () {
  // strict mode
  'use strict';

  // initialize variables
  let ballsSpeedSlider, ballsCount, ballColor, cursorColor, evilBallsProgress, innocentBallsProgress, speedChanger, ballColorToBoom, evilBallsEaten, innocentBallsEaten, evilBallsCount, canvas, ctx, balls, cursor, eatenSound;
  ballColorToBoom = '#673AB7';
  speedChanger = 1;
  canvas = document.getElementById('game_canvas');
  ctx = canvas.getContext('2d');
  ballsSpeedSlider = document.getElementById('balls-speed_slider');
  ballsCount = document.getElementById('balls-count');
  ballColor = document.getElementById('balls-color');
  cursorColor = document.getElementById('cursor-color');
  evilBallsProgress = document.getElementById('evil-progress');
  innocentBallsProgress = document.getElementById('innocent-progress');
  // end initialization

  // cursor object
  cursor = {
    x: 0,
    y: 0,
    color: '#2c3e50',

    draw: function (context) {
      context.save();
      context.translate(this.x, this.y);
      context.fillStyle = this.color;
      context.beginPath();
      context.moveTo(3, 3);
      context.arcTo(22, 22, -22, 22, 5);
      context.arcTo(-22, 22, 0, 0, 5);
      context.arcTo(0, 0, 22, 22, 5);
      context.fill();
      context.restore();
    },

    move: function (x, y) {
      this.x = x;
      this.y = y;
    },

    changeColor: function (color) {
      this.color = color;
    }
  }
  // end cursor

  // ball class
  class ball {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.r = (Math.random() * 18) + 24;
      this.c = randomColor();
      this.speedX = (-5.4 + (Math.random() * 10.8));
      this.speedY = (-5 + (Math.random() * 10));
    }
    draw(context) {
      context.save();
      context.fillStyle = this.c;
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    move() {
      this.x += this.speedX * speedChanger;
      this.y += this.speedY * speedChanger;
      if (this.x >= canvas.width - this.r) {
        this.speedX = -this.speedX;
        this.x = canvas.width - this.r;
      } else if (this.x <= this.r) {
        this.speedX = -this.speedX;
        this.x = this.r;
      }
      if (this.y >= canvas.height - this.r) {
        this.speedY = -this.speedY;
        this.y = canvas.height - this.r;
      } else if (this.y <= this.r) {
        this.speedY = -this.speedY;
        this.y = this.r;
      }
    }
  }
  // end ball

  // input fields of the game
  cursorColor.addEventListener('change', function (evt) {
    cursor.changeColor(evt.target.value);
  });
  ballColor.addEventListener('change', function (evt) {
    ballColorToBoom = evt.target.value;
    countEvilBalls();
  })
  ballsCount.addEventListener('input', function (evt) {
    startGame(evt.target.value)
  });
  ballsSpeedSlider.addEventListener('input', function (evt) {
    speedChanger = evt.target.value;
  });
  // end input fields

  // functions call
  startGame(14);

  eatenSound = new Howl({
    src: ['../audio/eatenSound.mp3', '../audio/eatenSound.wav'],
    volume: 0.5,
    onload: function () {
      mainAnimation();
    }
  });
  // end functions call

  function randomColor() {
    let color, colors;
    colors = ['E91E63', '673AB7', '00BCD4', 'CDDC39', 'FF9800', '4CAF50', ballColorToBoom.slice(1, ballColorToBoom.length)];
    // pink purple cyan lime orange grean THE LAST ITEM TO ENSUE THAT OUR TARGETED COLOR COULD HAVE THE BEST CHANGE TO BE CHOOSED
    color = colors[Math.round(Math.random() * (colors.length - 1))];
    return '#' + color;
  }
  // end random color

  function startGame(number) {
    balls = [];
    for (let i = 0; i < number; i++) {
      balls.push(new ball());
    }
    countEvilBalls();
    evilBallsEaten = 0;
    innocentBallsEaten = 0;
    evilBallsProgress.textContent = evilBallsEaten;
    innocentBallsProgress.textContent = evilBallsEaten;
    document.getElementById('game_progress').style.display = 'block';
    document.getElementById('case-message').style.display = 'none';
    document.getElementById('bg-music').play();
    speedChanger = 1;
    return balls;
  }
  // end start game

  // this for moving the player with mouse
  canvas.addEventListener('mousemove', function (evt) {
    let canvasRect = canvas.getBoundingClientRect();
    cursor.move(evt.clientX - canvasRect.left, evt.clientY - canvasRect.top)
  }, false);

  // disaple rightclick menu from appering within the canvas
  canvas.addEventListener('contextmenu', function (evt) {
    evt.preventDefault();
  });

  // test if the a rectangle is overlap a circle
  function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;

    if (testX < x0) {
      testX = x0;
    } else if (testX > (x0 + w0)) testX = (x0 + w0);

    if (testY < y0) {
      testY = y0;
    } else if (testY > (y0 + h0)) testY = (y0 + h0);

    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
  }
  // end test if the a rectangle is overlap a circle

  // init function for requestAnimationFreame function, should be used in every project
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function ( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  // end init function for requestAnimationFrame fucntion

  function countEvilBalls() {
    evilBallsCount = 0;
    balls.forEach(function (item) {
      if (item.c === ballColorToBoom) {
        evilBallsCount++
      }
    })
  }
  // end countEvilBalls

  // main function animation
  function mainAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(function (item, index, arr) {
      // this to draw everyball
      item.draw(ctx);
      // this to move everyball
      item.move();

      // remove a ball if it ovelaped with the cursor
      if (circRectsOverlap(cursor.x - 12, cursor.y, 28, 22, item.x, item.y, item.r)) {
        eatenSound.play();
        balls.splice(index, 1);

        if (item.c === ballColorToBoom) {
          evilBallsEaten++;
          evilBallsProgress.textContent = evilBallsEaten;
          evilBallsCount--;
        } else {
          innocentBallsEaten++;
          innocentBallsProgress.textContent = innocentBallsEaten;
        }

        // case win
        if (evilBallsCount === 0) {
          document.getElementById('game_progress').style.display = 'none';
          document.getElementById('case-message').style.display = 'block';
          document.getElementById('score').textContent = arr.length;
          document.getElementById('bg-music').pause();
          speedChanger = 0;
        }

        // case lose
        if (arr.length === 0) {
          document.getElementById('game_progress').style.display = 'none';
          document.getElementById('case-message').style.display = 'block';
          document.getElementById('case-message').innerHTML = 'you lose. game over'
        }

      }
      // end remove a ball if it ovelaped with the cursor

    });
    // end for each
    cursor.draw(ctx);

    window.requestAnimationFrame(mainAnimation)
  }
  // end mainAnimation

}());
// end IFEE