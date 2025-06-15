document.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball"); // targetting the ball element
    let paddle = document.getElementById("paddle"); // targetting the paddle element

    // here the ballX and ballY will be helping us to set a starting point of ball w.r.t table
    let ballX = 50; // distance of the top of the ball w.r.t ping pong table
    let ballY = 50; // distance of the left of the ball w.r.t ping pong table

    let dx = 2; // displacement factor in x-direction, 2 -> you will displace by 2 px in +x direction , -2 -> you will displace by 2px in -x direction
    let dy = 2; // displacement factor in y-direction, 2 -> you will displace by 2 px in +y direction , -2 -> you will displace by 2px in -y direction

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    setInterval(function exec() {
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        if(ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1; // change x-direction
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1; // change y-direction

        if(ballX < paddle.offsetLeft + paddle.offsetWidth &&
           ballY > paddle.offsetTop &&
           ballY + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight
        ) {
            dx*=-1;
        }
    },1);

    let paddleY=0;
    let dPy = 10; // displacement for paddle in y-direction
    document.addEventListener("keydown", (event) => {
        event.preventDefault(); // prevents the execution of the default event behaviour
        if(event.key=="ArrowUp" && paddleY > 0) {
            // up arrow 
            paddleY += (-1)*dPy;;
            console.log("up", paddleY)

        } else if(event.key == "ArrowDown" && paddleY < table.offsetHeight - paddle.offsetHeight) {
            // down arrow
            paddleY += dPy;
        }
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener("mousemove", (event) => {
        if(event.clientX > table.offsetLeft + (table.offsetWidth/2)) return;
        let mouseDistanceFromTop = event.clientY; // this is the distance of the mouse point from the top of the screen
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight/2;
        paddleY = mousePointControl;
        if(paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return; // if bottom of the paddle touches bottom of the table return
        paddle.style.top = `${paddleY}px`;
    });
});