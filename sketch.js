var estado = 0;
var menuIndex = -1;
var botoesMenu = ["Jogar", "Como Jogar", "Opções", "Créditos"];
var estaNoMenu = true;

var imagemMenu;
var musicaMenu;
var somClick;

var volume = 0.5;

var sliderX, sliderY, sliderLargura, sliderAltura;
var knobX;
var arrastando = false;

function preload() {
  imagemMenu = loadImage("back.jpg");
  musicaMenu = loadSound("menu.ogg");
  somClick = loadSound("click.ogg");
}

function setup() {
  let canvasWidth = min(windowWidth, 800);
  let canvasHeight = min(windowHeight, 600);
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.elt.style.display = 'block';
  canvas.elt.style.margin = '0 auto';

  textFont('Special Elite');
  textAlign(CENTER, CENTER);
  textSize(24);

  musicaMenu.setLoop(true);
  musicaMenu.setVolume(volume);
  musicaMenu.play();

  sliderLargura = 200;
  sliderAltura = 8;
  sliderX = width / 2 - sliderLargura / 2;
  sliderY = height / 2;
  knobX = sliderX + volume * sliderLargura;
}

function draw() {
  if (estado === 0) {
    menu();
  } else if (estado === 1) {
    jogar();
  } else if (estado === 2) {
    comoJogar();
  } else if (estado === 3) {
    creditos();
  } else if (estado === 4) {
    opcoes();
  }
}

function menu() {
  estaNoMenu = true;

  background(0);
  image(imagemMenu, 0, 0, width, height);

  fill(230);
  textSize(48);
  text("Spectral Fear", width / 2, height * 0.2);

  textSize(28);
  for (var i = 0; i < botoesMenu.length; i++) {
    var y = height * 0.4 + i * 70;
    var isHovered = mouseDentro(width / 2, y, 200, 50);
    var isSelected = (i === menuIndex && menuIndex !== -1);
    drawButton(botoesMenu[i], width / 2, y, isHovered || isSelected);
  }
}

function jogar() {
  estaNoMenu = false;
  background(5, 4, 3);
  fill(230);
  textSize(28);
  text("Em breve...", width / 2, height / 2);
  drawButton("Voltar", width / 2, height - 80, menuIndex === 0);
}

function comoJogar() {
  estaNoMenu = false;
  background(25, 35, 25);
  fill(230);
  textSize(24);

  let instrucoes = 
    "𑁍 Explore o ambiente com cuidado.\n\n" +
    "⮃ ⮂  Use o mouse/teclas para se mover e interagir.\n\n" +
    "𖠂 Fique atento a sons e pistas visuais.\n\n" +
    "‼ Evite ou fuja de perigos.\n\n" +
    "？Resolva mistérios para avançar.";

  text(instrucoes, width / 2, height / 2);
  drawButton("Voltar", width / 2, height - 80, menuIndex === 0);
}

function creditos() {
  estaNoMenu = false;
  background(10, 10, 20);
  fill(255);
  textSize(28);
  text("Volume da Música", width / 2, sliderY - 40);

  fill(100);
  rect(sliderX, sliderY, sliderLargura, sliderAltura);

  fill(255);
  ellipse(knobX, sliderY, 20, 20);

  if (arrastando) {
    knobX = constrain(mouseX, sliderX, sliderX + sliderLargura);
    volume = (knobX - sliderX) / sliderLargura;
    musicaMenu.setVolume(volume);
  }

  drawButton("Voltar", width / 2, height - 80, menuIndex === 0);
}

function opcoes() {
  estaNoMenu = false;
  background(15, 10, 8);
  fill(230);
  textSize(24);

  var texto = "Um jogo feito por Marta Isabelle Teixeira da Costa\n\n";
  texto += "Estilo: Terror\n\n";
  texto += "Feito com p5.js";

  text(texto, width / 2, height / 2);
  drawButton("Voltar", width / 2, height - 80, menuIndex === 0);
}

function drawButton(label, x, y, destaque) {
  if (destaque === undefined) destaque = false;
  rectMode(CENTER);
  if (destaque) {
    fill(85, 60, 120);
    stroke(255);
    strokeWeight(2);
  } else {
    fill(36, 27, 44);
    noStroke();
  }
  rect(x, y, 200, 50, 10);
  fill(255);
  noStroke();
  text(label, x, y);
}

function mouseClicked() {
  if (estado === 0) {
    for (var i = 0; i < botoesMenu.length; i++) {
      var y = height * 0.4 + i * 70;
      if (mouseDentro(width / 2, y, 200, 50)) {
        somClick.play();
        estado = i + 1;
        menuIndex = -1;
        musicaMenu.stop();
      }
    }
  } else {
    if (mouseDentro(width / 2, height - 80, 200, 50)) {
      somClick.play();
      estado = 0;
      menuIndex = -1;
      if (!musicaMenu.isPlaying()) {
        musicaMenu.loop();
      }
    }
  }
}

function touchEnded() {
  return mouseClicked();
}

function mousePressed() {
  if (estado === 3) {
    if (dist(mouseX, mouseY, knobX, sliderY) < 10) {
      arrastando = true;
    }
  }
}

function mouseReleased() {
  arrastando = false;
}

function mouseMoved() {
  if (estado === 0) {
    var found = false;
    for (var i = 0; i < botoesMenu.length; i++) {
      var y = height * 0.4 + i * 70;
      if (mouseDentro(width / 2, y, 200, 50)) {
        menuIndex = i;
        found = true;
        break;
      }
    }
    if (!found) menuIndex = -1;
  } else {
    if (mouseDentro(width / 2, height - 80, 200, 50)) {
      menuIndex = 0;
    } else {
      menuIndex = -1;
    }
  }
}

function mouseDentro(cx, cy, w, h) {
  return mouseX >= cx - w / 2 && mouseX <= cx + w / 2 &&
         mouseY >= cy - h / 2 && mouseY <= cy + h / 2;
}

function keyPressed() {
  if (estado === 0) {
    if (keyCode === UP_ARROW) {
      if (menuIndex === -1) {
        menuIndex = 0;
      } else {
        menuIndex = (menuIndex - 1 + botoesMenu.length) % botoesMenu.length;
      }
    } else if (keyCode === DOWN_ARROW) {
      if (menuIndex === -1) {
        menuIndex = 0;
      } else {
        menuIndex = (menuIndex + 1) % botoesMenu.length;
      }
    } else if ((keyCode === ENTER || keyCode === RETURN) && menuIndex !== -1) {
      somClick.play();
      estado = menuIndex + 1;
      menuIndex = -1;
      musicaMenu.stop();
    }
  } else {
    if (keyCode === ENTER || keyCode === RETURN) {
      if (menuIndex === 0) {
        somClick.play();
        estado = 0;
        menuIndex = -1;
        if (!musicaMenu.isPlaying()) {
          musicaMenu.loop();
        }
      }
    } else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      menuIndex = 0;
    }
  }
}
