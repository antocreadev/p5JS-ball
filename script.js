var tab = [];
function setup() {
  createCanvas(windowWidth, windowHeight );
  background(100);
  //creation de la balle par instatiation de la classe Ball
  for (let i = 0; i < random(10, 1000); i++) {
    tab[i] = new Ball(windowWidth / 4, windowHeight / 4, 80);
  }
}

function draw() {
  background(100);
  //trace de la balle
  tab.forEach((ball) => {
    ball.show();
    ball.move();
  });
}

function mouseClicked() {
  tab.forEach((ball, index) => {
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d <= ball.r) {
      tab.splice(index, 1);
    }
  });
}

class Ball {
  constructor(pos_x, pos_y, d) {
    // color
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.alpha = random(100, 200);

    //position axe x
    this.x = pos_x;
    //position axe y
    this.y = pos_y;
    //rayon
    this.r = d / 2;
    //vitesse
    let vitesse = random(0, 1);
    if (vitesse <= 0.5) {
      this.speed_x = random(1, 5);
      this.speed_y = random(1, 5);
    } else {
      this.speed_y = -random(1, 5);
      this.speed_x = -random(1, 5);
    }
  }
  move() {
    this.x = this.x + this.speed_x;
    this.y = this.y + this.speed_y;

    //test sur bord gauche et droit
    if (this.x >= width || this.x < this.r * 2) {
      this.speed_x = -this.speed_x;
    }
    //test sur bord haut et bas
    if (this.y >= height || this.y < this.r * 2) {
      this.speed_y = -this.speed_y;
    }
  }

  show() {
    noStroke();

    fill(this.red, this.green, this.blue, this.alpha);
    circle(this.x - this.r, this.y - this.r, this.r * 2);
  }
}
