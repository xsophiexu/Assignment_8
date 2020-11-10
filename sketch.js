let ap, ba, basket, wa, cat1, cat2;
let character, chess, co, con, idm, orch, ori, py, snow, chaos;
let size = 1;

function preload() {
    ap = loadImage('apple.png');
    ba = loadImage('banana.png');
    basket = loadImage('basket.png');
    wa = loadImage('watermelon.png');
    cat1 = loadImage('cat1.png');
    cat2 = loadImage('cat2.png');
    
    character = loadImage('character.jpg');
    chess = loadImage('chess.jpg');
    co = loadImage('container.jpg');
    con = loadImage('controller.jpg');
    idm = loadImage('idmLogo.jpg');
    orch = loadImage('orchestra.jpg');
    ori = loadImage('origami.jpg');
    py = loadImage('pyramid.jpg');
    snow = loadImage('snowman.jpg');
    chaos = loadImage('volume.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
    image(character, 0, 0);
    //tintPhoto();
    blur();
}

function tintPhoto() {
  loadPixels();
  for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = pixels[index+0];
          let g = pixels[index+1];
          let b = pixels[index+2];  
          
  
          pixels[index] = r;
          pixels[index + 1] = g; 
          pixels[index + 2] = b;
        }
  }
  updatePixels();
}


function blur() {
  loadPixels();
  for (var y = 0; y < 100; y++) {
        for (var x = 500; x < 600; x++) {
          boxBlur(x, y, 20);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}