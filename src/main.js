const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;

let circle = {
  x: canvas.width / 2,
  y: canvas.height / 2 - 100,
  radius: 300,
}

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2 - 100,
  vx: 4,
  vy: 4,
  radius: 20,
  elasticity: 1.0004,
  gravity: 0.1,
  color: "white",
  count: 0,
  minSpeed: 0.8
}

const counterDiv = document.querySelector('.counter');

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();

  update();


  requestAnimationFrame(draw);
}

function update () {
  ball.vy += ball.gravity;

  // Проверяем, чтобы скорость мяча не упала ниже минимальной
  // if (Math.abs(ball.vx) < ball.minSpeed) ball.vx = ball.minSpeed * (ball.vx > 0 ? 1 : -1);
  if (Math.abs(ball.vy) < ball.minSpeed) ball.vy = ball.minSpeed * (ball.vy > 0 ? 1 : -1);

  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.elasticity = 0.9 + Math.random() * 0.2;

  let dx = ball.x - circle.x;
  let dy = ball.y - circle.y;
  let distance = Math.sqrt(dx * dx + dy * dy);


  if (distance + ball.radius >= circle.radius) {
    let normalX = dx / distance;
    let normalY = dy / distance;

    ball.color = getRandomColorWord();
    ball.count++

    counterDiv.innerHTML = ball.count;

    let dotProduct = ball.vx * normalX + ball.vy * normalY;

    ball.vx -= 2 * dotProduct * normalX * ball.elasticity;
    ball.vy -= 2 * dotProduct * normalY * ball.elasticity;


    // console.log(ball.vx);
    console.log(ball.vy);

    let overlap = (distance + ball.radius) - circle.radius;

    ball.x -= normalX * overlap;
    ball.y -= normalY * overlap;

  }
}


function getRandomColorWord() {
  const colors = [
    'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown',
    'cyan', 'magenta', 'lime', 'indigo', 'violet', 'teal', 'gold'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}


draw();