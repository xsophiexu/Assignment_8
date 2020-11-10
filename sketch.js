let img;
let size = 1;

function preload() {
    img = loadImage('purplemountains.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
    image(img, 0, 0, 1920*.7*size, 1080*.7*size);
    tintPhoto();
    
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
  for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}