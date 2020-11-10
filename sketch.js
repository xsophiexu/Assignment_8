let ap, ba, basket, wa, cat1, cat2;
let character, chess, co, con, idm, orch, ori, py, snow, chaos;
let size = 1;
let sel;
let nfilter;

function preload() {
    ap = loadImage('apple.png');
    ba = loadImage('banana.png');
    //basket = loadImage('basket.png');
    wa = loadImage('watermelon.png');
    cat1 = loadImage('cat1.png');
    cat2 = loadImage('cat2.png');
    
    character = loadImage('character.jpeg');
    chess = loadImage('chess.jpg');
    co = loadImage('container.jpg');
    con = loadImage('controller.jpg');
    idm = loadImage('idmLogo.jpg');
    orch = loadImage('orchestra.jpg');
    ori = loadImage('origami.jpg');
    py = loadImage('pyramid.jpg');
    snow = loadImage('snowman.jpg');
    //chaos = loadImage('volume.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
    
    image(idm, 0, 0, 380, 380);
        erode(0, 0);
    
    image(chess, 430, 0);
    image(chess, 420, 0);
        transparency(420, 0, .5);
    image(co, 800, 0);
        creepy(800, 0);
    image(orch, 1130, 0, 400*.9, 372*.9);
        erode(1130, 0);
    
    image(ori, 950, 340, 700*.8, 524*.8);
    image(con, 0, 399, 700*.7, 538*.7);
        blur(0, 399);
    
    image(character, 530, 360);
      textAlign(CENTER);
      sel = createSelect();
      sel.position(550, 480);
      sel.option('original');
      sel.option('brighten');
      sel.option('dull');
      sel.option('transparent');
      sel.option('erode');
      sel.option('blur');
      sel.changed(colorImage);
    
    image(ap, 450, 490);
    image(ba, 1360, 590);
    image(wa, 260, 30);
    image(cat1, 990, 207, 150, 150);
    image(cat2, 40, 265, 150, 150);  
    textSize(14);
    text('Click on image to cycle through filters', 670, 400);
}

function colorImage(){
    let item = sel.value();
    loadPixels();
    for (let y = 360; y < 760; y++) {
        for (let x = 530; x < 930; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3]; 
          
          if(item == 'brighten'){
            pixels[index] = r+100;
          } else if (item == 'transparent'){
            pixels[index + 3] = a*0.4;
          } else if(item == 'dull'){
            creepy(530, 360);
          } else if(item == 'erode'){
            erode(530, 360);
          } else if(item == 'blur'){
            blur(530, 360);
          }
        }
  }
  updatePixels();
    image(ap, 450, 490);
}

function mouseClicked() {
  if (mouseX > 530 && mouseX < 930 && mouseY > 360 && mouseY < 760){
      nfilter+=1;
      if (nfilter > 5){
          nfilter = 0;
      }
      if (nfilter === 1){
          sel.selected('brighten');
      }
  }
}

function transparency(x1, y1, t) {
  loadPixels();
  for (let y = y1; y < height; y++) {
        for (let x = x1; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3]; 
          
          pixels[index] = r;
          pixels[index + 1] = g; 
          pixels[index + 2] = b;
          pixels[index + 3] = a*t;
        }
  }
  updatePixels();
}

function erode(x1, y1){
  loadPixels();
  for (let y = y1; y < height; y++) {
        for (let x = x1; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3]; 
          
          if (r>110){
            pixels[index] = r-40;
          }
          if (g>110){
            pixels[index + 1] = g-40; 
          }
          if (b>110){
            pixels[index + 2] = b-40;
          }
  }
  }
  updatePixels();
}

function blur(x1, y1) {
  loadPixels();
  for (let y = y1; y < height; y++) {
        for (let x = x1; x < width; x++) {
          boxBlur(x, y, 4);
        }
      }
      updatePixels();
}

function getIndex (x, y) {
  return (x + y * width)*4;
}

function boxBlur (x, y, bSize) {
  let avgR = 0;
  let avgG = 0;
  let avgB = 0;
  
  let pixelsSeen = 0;

  for (let dx = -bSize; dx < bSize+1; dx++) {
    for (let dy = -bSize; dy < bSize+1; dy++) {
   
      let index = getIndex(x + dx, y + dy);
      
      if (index < 0 || index > pixels.length) {
        continue;
      }
      
      let r = pixels[index+0];
      let g = pixels[index+1];
      let b = pixels[index+2];
      
      avgR += r;
      avgG += g;
      avgB += b;
      
      pixelsSeen += 1;
    }
  }
  
  avgR /= pixelsSeen;
  avgG /= pixelsSeen;
  avgB /= pixelsSeen;
  
  let trueIndex = getIndex(x, y);
  
  pixels[trueIndex] = avgR;
  pixels[trueIndex + 1] = avgG;
  pixels[trueIndex + 2] = avgB;
}

function creepy(x1, y1){
  loadPixels();
  for (let y = y1; y < height; y++) {
        for (let x = x1; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];
          let a = pixels[index+3]; 
          
          pixels[index] = r-30;
          pixels[index + 1] = g+40; 
          pixels[index + 2] = b+40;
     }
   }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}