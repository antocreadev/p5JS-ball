var tab = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
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

function mouseDragged() {
  print("mouse dragged");
  for (let index = 0; index < tab.length; index++) {
    const element = tab[index];
    let d = dist(mouseX, mouseY, element.x - element.r, element.y - element.r);
    if (d <= element.r) {
      element.x = mouseX + element.r;
      element.y = mouseY + element.r;
    }
  }
}

// mouseClicked() -> fonctionne que sur pc 
// touchEnded() -> mobile et pc 
function touchEnded() {
  print("click");
  tab.forEach((ball, index) => {
    let d = dist(mouseX, mouseY, ball.x - ball.r, ball.y - ball.r);

    if (d <= ball.r) {
      print(d, ball.r);
      tab.splice(index, 1);
    }
  });
}

function keyPressed() {
  tab.forEach((ball) => {
    ball.moved = !ball.moved;
  });
}

class Ball {
  constructor(pos_x, pos_y, d) {
    // color
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.alpha = random(100, 200);
    // this.move = true;

    //position axe x
    this.x = pos_x;
    //position axe y
    this.y = pos_y;
    //rayon
    this.r = d / 2;
    //vitesse

    this.moved = true;

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
    if (this.moved == true) {
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
  }

  show() {
    noStroke(); // pas de bordure
    fill(this.red, this.green, this.blue, this.alpha); // couleur
    // beginShape();
    // créer un cercle largeur x et haut y, this - r permet de mettre le point d'encrage au milieu du cercle
    circle(this.x - this.r, this.y - this.r, this.r * 2);
    // beginShape();
  }
}
