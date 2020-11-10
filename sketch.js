let vid;

let stars, swirl, astro, tv, upside, walk, type, paper, bird, water, house, kite;
let yell, blu;
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
function setup() {
    createCanvas(1000, 1000);
    pixelDensity(1);
    
    yell = createImage(width, height)
    blu = createImage(width, height);
    
    motion(paper);
    stamp(walk, yell, blu);

    vid = createCapture(VIDEO);
    vid.size(320, 240);
    vid.hide();
    
}

function draw() {
    background(0);
    b = map(mouseX, 0, width, 0, 60);
    
    //images
    image(stars, 0, 0);
        wnoise(stars);
    image(swirl, 0, 0);
        block(swirl);
        wnoise(swirl);
    image(astro, 0, 0);
    image(vid, 430, 710, 320 * 0.50, 240 * 0.50);
    image(tv, 0, 0);
    image(upside, 0, 0);
    image(walk, 0, 0);
    image(type, 0, 0);
    image(paper, 0, 0);
    image(bird, 0, 0);
    //if ___ rainbow down
    //else rainbow up (aurora borealis style)
        rainbow(bird);
    image(water, 0, 0);
    image(house, 0, 0);
        wnoise(house);
    image(kite, 0, 0);
    
    image(yell, 10, 0);
    image(blu, -10, 0);
    
}

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
                    //stars.pixels[index+3] = 200; 
                }
            
          
        }
      }
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
                    //stars.pixels[index+3] = 200; 
                }
          
          //let avg = (r + g + b) / 3;
          
          
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
let changed = false;
let max = false;
let ogr;
let originals = [];
let got = false;
let adding = true;
let timer;
let initial = true;
function rainbow(img) {
    img.loadPixels();
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                var index = (x + y * img.width)*4;
                
                let r = img.pixels[index+0];
                let g = img.pixels[index+1];
                let b = img.pixels[index+2];
                let a = img.pixels[index+3]; 
                
                
//                if(got == false) {
//                    let red = {
//                        val: r,
//                        state: 0
//                    }
//                    originals.push(red);
//                    originals.push(g);
//                    originals.push(b);
//                    originals.push(a);
//                }
                if(r > 70 && r < 200 && g < 140 && b < 140)
                    img.pixels[index+0] += 5;
                if(b > 70 && b < 200 && r < 140 && g < 140)
                    img.pixels[index+2] += 5;

//                
//                if(r < 10)
//                    adding == true
//                
//                
//                if(adding == true)
//                    img.pixels[index+0] += 5;
//                if(adding == false)
//                    img.pixels[index+0] -=5;
                
//                
//                var max = (img.width + img.height * img.width)*4;

//                
//                if(r == 255) {
//                    originals[index].state = 1;
//                }
//                if(originals[index].state == 0;){
//                   img.pixels[index+0] ++; 
//                }
//                
//                //this means it has reached max value
//                if(originals[index].state == 1) {
//                    if(r > originals[index].r)
//                        img.pixels[index+0] --;
//                    if(r == originals[index].r)
//                        originals[index].state = 0;
//                }
//                if(r<255 && changed == false){
//                    img.pixels[index+0] ++;
//                    if (r >250 && changed == false) {
//                        changed == true;
//                        print('thisruns');
//                    }
//                }
//
//                
//                if(r > originals[index] && changed == true) {
//                     img.pixels[index+0]-= 10;
//                    if(r < originals[index] + 5 && changed == true)
//                        changed == false;
//                    
//                }
                   

//                
//                if(r > 150 && b < 100 && g < 100 && changed == false) {
//                        img.pixels[index+0]-=1;
//                    //done changing
//                    if(r < 160)
//                        changed = true;
//                }
//                
//                if(changed == true && r < originals[index]) {
//                    img.pixels[index+0]+=1;
//                    if(r > originals[index] - 10) 
//                        changed == false;
//                }
//                
//                if(r > 145 && r <= 150) {
//                    img.pixels[index+3] == 250;
//                }
//                if(a == 250 && r < 235) {
//                    img.pixels[index+0]+=5;
//                }
//                if(r > 225 && r <= 235) {
//                    img.pixels[index+3] == 255;
//                }
//                if(b > 150) {
//                    img.pixels[index+0]+=5;
//                }
        }
      }
    if(got == false)
        print('ends push')
    got = true;

      img.updatePixels();
}