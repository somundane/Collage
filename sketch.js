let vid;

let stars, swirl, astro, tv, upside, walk, type, paper, bird, water, house, kite;
function preload() {
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

function setup() {
    createCanvas(1000, 1000);
    vid = createCapture(VIDEO);
    vid.size(320, 240);
    vid.hide();
    
}
function draw() {
    background(0);
    ellipse(0, 0, 20)
    
    //images
    image(stars, 0, 0);
    image(swirl, 0, 0);
    image(astro, 0, 0);
    image(vid, 430, 710, 320 * 0.50, 240 * 0.50);
    image(tv, 0, 0);
    image(upside, 0, 0);
    image(walk, 0, 0);
    image(type, 0, 0);
    image(paper, 0, 0);
    image(bird, 0, 0);
    image(water, 0, 0);
    image(house, 0, 0);
    image(kite, 0, 0);
    
}