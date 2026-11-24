//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 1000;

//game state
let gameStatus = 'play';

//paddles
const paddleWidth = 14;
const paddleHeight = 110;

// player1
const playerOne = {
	x: 10,
	y: canvas.height / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	score: 0
}

const playerTwo = {
	x: canvas.width - paddleWidth - 10,
	y: canvas.height / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	score: 0
}

//ball
const ballSize = 18;
//velocity
let velocityX = 4;
let velocityY = 3;

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	width: ballSize,
	height: ballSize
}

// collision detection
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}


function checkGoal() {
	if (ball.x >= canvas.width) {
		playerOne.score += 1;
		velocityX = -4;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
	}

	if (ball.x + ballSize <= 0) {
		playerTwo.score += 1;
		velocityX = 4;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
	}
}

function checkGameEnd() {
	if (playerOne.score >= 5) {
		gameStatus = "end";
		ctx.fillStyle = "white";
		ctx.fillText("Player One Wins!", canvas.width / 2, canvas.height /2);
	}

	if (playerTwo.score >= 5) {
		gameStatus = "end";
		ctx.fillStyle = "white";
		ctx.fillText("Player Two Wins!", canvas.width / 2, canvas.height /2);
	}
}

//game loop
function update() {
	if (gameStatus === 'play') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//top and bottom collision
		if (ball.y <= 0 || ball.y + ballSize >= canvas.height) velocityY *= -1;
		
		
		ctx.fillStyle = "green";
		ctx.fillRect(playerOne.x, playerOne.y, paddleWidth, paddleHeight);
		ctx.fillRect(playerTwo.x, playerTwo.y, paddleWidth, paddleHeight);

		ctx.fillStyle = "red";
		for (let i = 0; i < 1000; i += 70) {
			ctx.fillRect(500, i, 7, 50);
		}

		ctx.fillStyle = "blue";
		ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
		ball.x += velocityX;
		ball.y += velocityY;

		//scores
		ctx.font = "48px serif";
		ctx.fillStyle = "white";
		ctx.fillText(playerOne.score, canvas.width * 0.4, canvas.height / 10);
		ctx.fillText(playerTwo.score, canvas.width * 0.6, canvas.height / 10);
 
		checkGoal();

		if (checkCollision(ball, playerOne)) {
			velocityX = 4;
		}

		if (checkCollision(ball, playerTwo)) {
			velocityX = -4;
		}

		checkGameEnd();

	}
	requestAnimationFrame(update);
}

update();



window.addEventListener('keydown', (e) => {
	if (e.key === "a") {
		if (playerOne.y <= 0) {
			
		}
		else {
			playerOne.y -= 12;	
		}
	}

	if (e.key === 'z') {
		if (playerOne.y + paddleHeight >= canvas.height) {
			
		}
		else {
			playerOne.y += 12;
		}
	}
	
	if (e.key === 'ArrowUp') {
		if (playerTwo.y <= 0) {
			
		}
		else {
			playerTwo.y -= 12;
		}
	}

	if (e.key === 'ArrowDown') {
		if (playerTwo.y + paddleHeight >= canvas.height) {
		
		}
		else {
			playerTwo.y += 12;	
		}
	}

	if (e.key === ' ') {
		// console.log('spacebar');
		if (gameStatus = "end") {
			gameStatus = 'play';
			playerOne.score = 0;
			playerTwo.score = 0;
			playerOne.y = canvas.height / 2 - paddleHeight / 2;
			playerTwo.y = canvas.height / 2 - paddleHeight / 2;
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			velocityX = 4; 
		}
	}
});


