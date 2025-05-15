var estado = 0;
var menuIndex = -1; // nenhum botão selecionado inicialmente
var botoesMenu = ["Jogar", "Como Jogar", "Créditos"];
var estaNoMenu = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // fonte de texto
  textFont('Special Elite');
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(11, 4, 11); // fundo roxo escuro

  if (estado === 0) {
    menu();
  } else if (estado === 1) {
    jogar();
  } else if (estado === 2) {
    comoJogar();
  } else if (estado === 3) {
    creditos();
  }
}

function menu() {
  estaNoMenu = true;
  fill(230);
  textSize(48);
  text("Dust of Chaos", width / 2, height * 0.2);

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

  // texto das instruções
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
  background(15, 10, 8);
  fill(230);
  textSize(24);

  // texto dos créditos
  var texto = "Um jogo feito por Marta Isabelle Teixeira da Costa\n\n";
  texto += "Estilo: Terror\n\n";
  texto += "Feito com p5.js";

  text(texto, width / 2, height / 2);
  drawButton("Voltar", width / 2, height - 80, menuIndex === 0);
}

// botão com "hover" em roxo e borda branca
function drawButton(label, x, y, destaque) {
  if (destaque === undefined) destaque = false;
  rectMode(CENTER);
  if (destaque) {
    fill(85, 60, 120); // roxo
    stroke(255);         // borda branca
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
        estado = i + 1;
        menuIndex = -1;
      }
    }
  } else {
    // Voltar
    if (mouseDentro(width / 2, height - 80, 200, 50)) {
      estado = 0;
      menuIndex = -1;
    }
  }
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

// função para controlar seleção por teclado
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
      estado = menuIndex + 1;
      menuIndex = -1;
    }
  } else {
    if (keyCode === ENTER || keyCode === RETURN) {
      if (menuIndex === 0) {
        estado = 0;
        menuIndex = -1;
      }
    } else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      menuIndex = 0;
    }
  }
}

