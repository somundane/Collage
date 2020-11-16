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
let yell, blu, yell2, blu2, original, pixelate;
let clear;
function setup() {
    timer = millis();
    createCanvas(1000, 1000);
    pixelDensity(1);
    
    //images created
    yell = createImage(width, height)
    blu = createImage(width, height);
    yell2 = createImage(width, height)
    blu2 = createImage(width, height);
    pixelate = createImage(width, height);
    original = createImage(width, height);
    
    //(covered by drawn but used in pixelation)
    //setup filters 
    motion(paper);
    motion(swirl);
    motion(upside);
    stamp(walk, yell, blu);
    stamp(kite, yell2, blu2);
    
    //setup images 
    image(stars, 0, 0);
    image(swirl, 0, 0);
    image(astro, 0, 0);
    image(tv, 0, 0);
    image(upside, 0, 0);
    image(walk, 0, 0);
    image(type, 0, 0);
    image(paper, 0, 0);
    image(bird, 0, 0);
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

function draw() {
    background(0);
    b = map(mouseX, 0, width, 0, 60);
    
    //images; filters are indented
    image(stars, 0, 0);
        wnoise(stars);
    image(swirl, 0, 0);
        block(swirl);
        wnoise(swirl);
    image(astro, 0, 0);
    //delay load of "hidden" message
    if((millis() - timer) > 6000) {
        fill(60);
        text("hi :)", 490, 750)
        text("you got a message:", 450, 770)
        text("have a nice day!", 455, 790)
    }
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
        wnoise(house);
    image(kite, 0, 0);
    image(yell, 10, 0);
    image(blu, -10, 0);
    image(yell2, 10, 0);
    image(blu2, -10, 0);
    image(pixelate, 0, 0);
}

//Video Filter: transparency in light areas, blue tint in mid, red tint in dark
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
        }
      }
      img.updatePixels(); 
}
//white noise: causes stars to sparkle and bright areas to create "noise" via random number
//code is set up so that it's not too quick and noisey -- so that stars will twinkle
let starsloc = [];
function wnoise(img) {
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
            
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2]; 
                let a = img.pixels[index+3];  

                if(r > 100 && g > 100 && b > 100) {
                    let r = random(120, 255);
                    img.pixels[index+0] = r-5;
                    img.pixels[index+1] = r-5;
                    img.pixels[index+2] = r;
                } 
                
        }
      }
      img.updatePixels();
}

//Mask Filter: for removing dark areas of images
//Future: can add another parameter in tandem with color picker; so user can pick color they want to mask
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

//Motion effect utilizing box blur with greater movement/directional blur on Y axis
//removed blurring of red channel (aka red channel stays while the rest o fthe image is blurred) giving a color split effect
function motion(img){
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
        for (var x = -50; x < img.width + 100; x++) {
          motionBlur(img, x, y);
        }
      }
    img.updatePixels();
}
//modified box blur code from class
function motionBlur(img, x, y) {
    let avgG = 0;
    let avgB = 0;
  
    let pixelsSeen = 0;
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

//stamp filter: involves creation of 2 duplicate images. Takes away dark shades and colorizes brighter shades into a more transparent duplicate
function stamp(img, yell, blu) {
    yell.loadPixels();
    blu.loadPixels();
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
                yell.set(x, y, c);
                
                r = r-255;
                g = g-255;
                r = r/2;
                g = g/2;
                c = color(r,g,b,a);
                blu.set(x, y, c);
        }
      }
    yell.updatePixels();
    blu.updatePixels();
}

//enhance bibrancy of bird (select RGB values as condition - to make it smoother / no jaggedness in color correction)
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
                
            }
      }
    img.updatePixels();
}

//Mouse interaction: pixelation (average all rs gs and bs in an area and apply that color to all pixels in area)
function mouseDragged () {
    pixelate.loadPixels();
    loadPixels();
    let allr = 0;
    let allg = 0;
    let allb = 0;
    let count = 0;
   for (var y = mouseY - 25; y < mouseY + 25; y++) {
            for (var x = mouseX - 25; x < mouseX + 25; x++) {
                var index = (x + y * pixelate.width)*4;
        
                let r = pixels[index+0];
                let g = pixels[index+1];
                let b = pixels[index+2]; 
                let a = pixels[index+3];  
            
                allr += r;
                allg += g;
                allb += b;
                count++;
                
                
                if(y == mouseY + 24 && x == mouseX + 24) {
                    r = allr/count;
                    g = allg/count;
                    b = allb/count;
                       for (var y = mouseY - 25; y < mouseY + 25; y++) {
                        for (var x = mouseX - 25; x < mouseX + 25; x++) {
                            let c = color(r,g,b,a);
                            pixelate.set(x, y, c);
                        }
                       }
                }
        }
      }
  
    pixelate.updatePixels();
}
function getIndex (x, y) {
  return (x + y * width)*4;
}

//played around with showing original image on key press (realized I applied filters in setup)
//function keyPressed() {
//    show = true;
//}
//function keyReleased() {
//    show = false;
//}
//function showOriginal(img) {
//    img.loadPixels();
//    loadPixels();
//        for (var y = 0; y < img.height; y++) {
//            for (var x = 0; x < img.width; x++) {
//                var index = (x + y * img.width)*4;
//        
//                let r = pixels[index+0];
//                let g = pixels[index+1];
//                let b = pixels[index+2]; 
//                let a = pixels[index+3];  
//                let c = color(r,g,b,a);
//                img.set(x, y, c);
//        }
//      }
//    img.updatePixels();
//}


