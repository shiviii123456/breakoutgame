//selecting canvas element
const canvas = document.getElementById('canva');
//we are passing tons of methods which we can actually use to draw within our canvas
const c = canvas.getContext("2d");


// defining bricks
const brick = {
    row: 3,
    column: 5,
    width: 55,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 30,
    fillColor: "brown",
    strokeColor: "black",
};
let bricks = [];
function createBricks() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let d = 0; d < brick.column; d++) {
            bricks[r][d] = {
                x: d * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                //when the brick is not broken
                status: true,
            };
        }
    }
}
createBricks();
function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let d = 0; d < brick.column; d++) {
            let b = bricks[r][d];
            if (b.status) {
                c.fillStyle = brick.fillColor;
                c.fillRect(b.x, b.y, brick.width, brick.height);

                c.strokeStyle = brick.strokeColor;
                c.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}
//creating game variable and constants
const paddlewidth = 150;
const paddleheight = 40;
const hbottom = 20;
let rightarrow = false;
let leftarrow = false;
//using  line width
c.lineWidth = 3;
//creating paddle and  ball 
let paddle = {
    x: canvas.width / 2 - paddlewidth / 2,
    y: canvas.height - paddleheight - hbottom,
    width: paddlewidth,
    height: paddleheight,
    dx: 4,
}
function creatingpaddle() {
    c.fillStyle = "black";
    c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    c.strokeStyle = "yellow";
    c.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        leftarrow = true;
    } else if (event.keyCode == 39) {
        rightarrow = true;
    }
});
document.addEventListener("keyup", function (event) {
    //37 is keycode for leftarrow and 39 is keycode for rightarrow
    if (event.keyCode == 37) {
        leftarrow = false;
    } else if (event.keyCode == 39) {
        rightarrow = false;
    }
});
//moving of paddle
function movepaddle() {
    if (rightarrow && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;

    }
    else if (leftarrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}
//intializing ball radius
const ballradius = 20;
let ball = {
    x: canvas.width / 2,
    y: paddle.y - ballradius,
    radius: ballradius,
    speed: 4,
    dx: 3,
    dy: -3,
}
//drawing ball
function creatingball() {
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    //to draw this path we need to use stroke method
    c.strokeStyle = "black";
    c.stroke();
    c.closePath();
}
//movement of ball
function moveball() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
//moving the ball
function ballwallcollide() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > canvas.height) {
        liffe--;
        resetball();
    }

}

//when ball reaches bottom create a new ball
function resetball() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ballradius;
    ball.dx = 3;
    ball.dy = -3;
}
//ball and paddle collision
function ballpaddlecollision() {
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddleheight && ball.y > paddle.y) {
        collide.play();
        // setTimeout(()=>{
        //     audio2.play();
        // },10);
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
    }
}
let score = 0;
//brick and ball collision
function ballbrickcollision() {
    for (let i = 0; i < brick.row; i++) {
        for (let j = 0; j < brick.column; j++) {
            let b = bricks[i][j];
            if (b.status) {
                if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                    // setTimeout(()=>{
                    //     audio3.play();
                    // },100);
                    ball.dy = -ball.dy;
                    b.status = false;//the brick is broken 
                    score++;
                }
            }

        }
    }
}
function wonn(){
    let allbroken = true;
    // check if all the bricks are broken
    for (let i = 0; i < brick.row; i++) {
        for (let j = 0; j < brick.column; j++) {
            allbroken = allbroken && !bricks[i][j].status;
        }
    }
    if (allbroken) {
        
        c.fillStyle = "black";
        c.font = "30px Arial"
        c.fillText("youwin", canvas.width / 2-30, canvas.height / 2);
        gameover=true;
      //  over.play();
        // setTimeout(()=>{
        //     audio1.play();
        // },100);
    }

}

//displaying score

function drawscore() {
    c.font = '20px Arial';
    c.fillStyle = "yellow";
    c.fillText("score: " + score, 9, 20);
}
//life left for the player
let liffe = 1;
function gameliffe() {
    c.fillStyle = "yellow";
    c.font = "20px Arial";
    c.fillText("life : " + liffe, canvas.width / 2 + 90, 20);
}


let gameover = false;
// when is life becomes game is over
function over() {
    if (liffe <= 0) {
        c.fillStyle = "black";
        c.font = "30px Arial"
        c.fillText("youlost", canvas.width / 2-30, canvas.height / 2);
        gameover = true;
        hit.play();
        // setTimeout(()=>{
        //     audio1.play();
        // },100);
    }
}
function update(){
    movepaddle();
    moveball();
    ballwallcollide();
    ballpaddlecollision();
    ballbrickcollision();
     over();
     wonn(); 
}
function draw() {
    creatingpaddle();
    creatingball();
    drawBricks();
    drawscore();
    gameliffe();
}
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    if (!gameover) {
        //using request animation frame to create a loop.when we call this animate function it is going to create loop for us.
        requestAnimationFrame(animate);
    }


}
animate();

//when user clicks on start again

// const restart = document.getElementById('restart');
//  restart.addEventListener("click", function(){
//     location.reload(); //load the page
//  })
//for adding audio

 const hit=new Audio();
 hit.src="img/sound1.mp3";

 //const over=new Audio();
// over.src="img/sound2.mp3";


 const collide=new Audio();
 collide.src="img/sound3.mp3";

