let vid;

let stars, swirl, astro, tv, upside, walk, type, paper, bird, water, house, kite;
function preload() {
    //images from unsplash; full list @ sources.txt
    stars = loadImage('images/1.png');
    swirl = loadImage('images/2.png');
    astro = loadImage('images/3.png');
    tv = loadImage('images/4.png');
    upside = loadImage('images/5.png');
    walk = loadImage('images/6.png');
    type = loadImage('images/7.png');
    paper = loadImage('images/8.png');
    bird = loadImage('images/9.png');
    water = loadImage('images/10.png');
    house = loadImage('images/11.png');
    kite = loadImage('images/12.png');

}

let b = 0;
let timer;

let yell, blu;
let yell2, blu2;
let star2;
function setup() {
    timer = millis();
    createCanvas(1000, 1000);
    pixelDensity(1);
    
    yell = createImage(width, height)
    blu = createImage(width, height);
    yell2 = createImage(width, height)
    blu2 = createImage(width, height);
    star2 = createImage(width, height);
    
    motion(paper);
        stamp(walk, yell, blu);
        stamp(kite, yell2, blu2);
    motion(house);
    motion(swirl);

    image(stars, 0, 0);
        block(swirl);
    image(swirl, 0, 0);
    image(astro, 0, 0);
    image(tv, 0, 0);
    image(upside, 0, 0);
    image(walk, 0, 0);
    image(type, 0, 0);
    image(paper, 0, 0);
    image(water, 0, 0);
    image(house, 0, 0);
    image(kite, 0, 0);
    image(yell, 10, 0);
    image(blu, -10, 0);
    image(yell2, 10, 0);
    image(blu2, -10, 0);
    
    vid = createCapture(VIDEO);
    vid.size(320, 240);
    vid.hide();
    
}

let birdpos = [];
let store = false;
let hoverbird;
function draw() {
    wnoise(stars);
    image(star2, 0, 0);
    //background(0);
    image(vid, 430, 710, 320 * 0.50, 240 * 0.50);
        screen(vid, 25);
    image(tv, 0, 0);
    
    image(upside, 0, 0);
    image(walk, 0, 0);
    image(type, 0, 0);
    image(paper, 0, 0);
    image(bird, 0, 0);
        rainbow(bird);
    image(water, 0, 0);
    image(house, 0, 0);
    image(kite, 0, 0);
//    
//    image(yell, 10, 0);
//    image(blu, -10, 0);
//    pixelate();
    
}

function pixelate() {
    
}

function mousePressed () {
    loadPixels();
    
   for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
        
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  
            
                let avg = (r + g + b) / 3;
                img.pixels[index+0] = avg;
                img.pixels[index+1] = avg;
                img.pixels[index+2] = avg;
                

        }
      }
  
    updatePixels();
}

function screen(img, shade) {
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
        
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  
            
                let avg = (r + g + b) / 3;
                
                if(avg > 150) {
                    img.pixels[index+3] = 100;
                }
                else {
                    img.pixels[index+2] += 50;
                } 
                if(avg < shade) {
                    img.pixels[index+0] += 50;
                }

//                img.pixels[index+0] = avg + 30;
//                img.pixels[index+1] = avg + 30;
//                img.pixels[index+2] = avg + 30;
        }
      }
      img.updatePixels(); 
}
let starsloc = [];
function wnoise(img) {
    star2.loadPixels();
    img.loadPixels();
        for (var y = 0; y < img.height/2; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
            
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  

                if(r > 100 && g > 100 && b > 100) {
                    let r = random(120, 255);
                    r = r-5;
                    g = r-5;
                    b = r;
                } 
                else {
                    a = 0;
                }
                
                let c = color(r,g,b,a);
                star2.set(x, y, c);
                
//                if(r > 100 && g > 100 && b > 100) {
//                    let r = random(120, 255);
//                    img.pixels[index+0] = r-5;
//                    img.pixels[index+1] = r-5;
//                    img.pixels[index+2] = r;
//                } 
                
        }
      }
    star2.updatePixels();
    img.updatePixels();
}

//mask
function block(img) {
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
        
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  
            
                if(r < 50 && g < 50 && b < 50) {
                    img.pixels[index+3] = 100;
                }
        }
      }
      img.updatePixels();
}
function motion(img){
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
        for (var x = -50; x < img.width + 100; x++) {
          motionBlur(img, x, y);
        }
      }
    img.updatePixels();
}
//modified box blur code from class\
function getIndex (x, y) {
  return (x + y * width)*4;
}
function motionBlur(img, x, y) {
    let avgG = 0;
    let avgB = 0;
  
    let pixelsSeen = 0;
    // Go through each neighborly pixel.
    for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 20; dy++) {
        let index = getIndex(x + dx, y + dy);
      
            // If we're off the pixel array, ignore it!
            if (index < 0 || index > img.pixels.length) {
                continue;
            }
            let g = img.pixels[index+1];
            let b = img.pixels[index+2];

            avgG += g;
            avgB += b;
      
            pixelsSeen += 1;
        }
    }
    avgG /= pixelsSeen;
    avgB /= pixelsSeen;
  
    let trueIndex = getIndex(x, y);

    img.pixels[trueIndex + 1] = avgG;
    img.pixels[trueIndex + 2] = avgB;
}
function stamp(img, one, two) {
    one.loadPixels();
    two.loadPixels();
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
        
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  
                
                if(r < 10 || g < 10 || b < 10) {
                    a = 0;
                }
                r = 255 - r;
                g = 255 - g;
                if(a > 50) {
                    a = a * 0.5;
                }
                let c = color(r,g,b,a);
                one.set(x, y, c);
                
                r = r-255;
                g = g-255;
                r = r/2;
                g = g/2;
                c = color(r,g,b,a);
                two.set(x, y, c);
        }
      }
    one.updatePixels();
    two.updatePixels();
}

function rainbow(img) {
    
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
                var mouse = (mouseX + mouseY * img.width)*4

                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2];
                let a = img.pixels[index+3];

                if(r > 70 && r < 200 && g < 140 && b < 140)
                    img.pixels[index+0] += 5;
                if(b > 70 && b < 200 && r < 140 && g < 140)
                    img.pixels[index+2] += 5;
                
//                if(index == mouse && a > 230) {
//                    print('tru');
//                    fadeBird(img);
//                    //hoverbird == true
//                    
//                }
//                else {
//                    colorBird(img);
//                }
            }
      }
    img.updatePixels();
}

//function colorBird(img) {
//     img.loadPixels();
//        for (var y = 0; y < img.height; y++) {
//            for (var x = 0; x < img.width; x++) {
//                var index = (x + y * img.width)*4;
//
//                let r = img.pixels[index+0];
//                let g = img.pixels[index+1];
//                let b = img.pixels[index+2];
//                let a = img.pixels[index+3];
//
//                if(r > 70 && r < 200 && g < 140 && b < 140)
//                    img.pixels[index+0] += 5;
//                if(b > 70 && b < 200 && r < 140 && g < 140)
//                    img.pixels[index+2] += 5;
//            }
//        }
//
//    img.updatePixels();
//}
//function fadeBird(img) {
//     img.loadPixels();
//        for (var y = 0; y < img.height; y++) {
//            for (var x = 0; x < img.width; x++) {
//                var index = (x + y * img.width)*4;
//
//                let r = img.pixels[index+0];
//                let g = img.pixels[index+1];
//                let b = img.pixels[index+2];
//                let a = img.pixels[index+3];
//
//                if(r > 70 && r < 200 && g < 140 && b < 140)
//                    img.pixels[index+0] -= 5;
//                if(b > 70 && b < 200 && r < 140 && g < 140)
//                    img.pixels[index+2] -= 5;
//            }
//        }
//
//    img.updatePixels();
//}