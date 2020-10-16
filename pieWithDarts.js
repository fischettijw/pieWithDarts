const diam = 750;
let dartWeight = 1;
let darts = 0;
let inCircle = 0;
let ratio = 0;
let pie = 0;
let pieDiv;
const dartMinimumStop = 300000;
const lowStop = 3.14155;
const highStop = 3.14163;

const batchDarts = 10000;
const drawGraphic = true;

let seed = 67; // use   null   for no seed
let randomMethod = p5js; // null or p5js = p5js;    // =rndDigits;
let digitsMethod;

function setup() {
    digitsMethod = digitsOfPie; //  digitsOfPie               digitsOfE
    digitsMethod = digitsOfE;
    randomMethod = (randomMethod == null) ? p5js : randomMethod;
    randomSeed((seed == null) ? null : seed); // p5js
    randomSeedDigits(((seed == null) ? 0 : seed)); // rndDigits
    if (drawGraphic) {
        createCanvas(diam, diam);
        background(220);
        strokeWeight(1);
        stroke('red');
        fill('white');
        circle(diam / 2, diam / 2, diam);
    }
    pieDiv = createDiv().style('font-size', '14pt');
}

function draw() {
    generateDarts(batchDarts);
    if (drawGraphic) {
        stroke(255, 0, 0);
        strokeWeight(dartWeight);
        fill(255, 0, 0, 0);
        circle(diam / 2, diam / 2, diam);
        stroke('red');
    }
    output();
}

function generateDarts(n) {
    let r = diam / 2;
    if (drawGraphic) { strokeWeight(dartWeight); }
    for (let i = 0; i < n; i++) {
        let x = randomMethod();
        let y = randomMethod();
        let dartRadius = dist(x, y, r, r);
        if (dartRadius < r) {
            if (drawGraphic) { stroke('red'); }
            inCircle++;
        } else {
            if (drawGraphic) { stroke('black'); }
        }
        if (drawGraphic) { point(x, y) };
        ratio = inCircle / (frameCount * n);
        darts++;
        pie = 4 * ratio;
        if (pie > lowStop && pie < highStop && darts > dartMinimumStop) {
            noLoop();
            break;
        }
    }
}

function output() {
    pieDiv.html(`&nbsp Diameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${diam} <br> &nbsp  
    Batch Darts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${batchDarts} <br> &nbsp 
    Simulated Pie ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${nf(pie,1,5)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${lowStop}0 - ${highStop}0 <br> &nbsp  
    Number of Darts ;&nbsp;&nbsp;&nbsp${darts} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp \> ${dartMinimumStop} <br> &nbsp 
    % Deviation ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp${nf((PI - pie) * 100 / PI,1,5)} % <br> &nbsp 
    randomMethod &nbsp;&nbsp;&nbsp;&nbsp ${randomMethod} &nbsp;&nbsp ${seed}<br>&nbsp ${digitsMethod.substring(0,80)}`);

    // JS Template literals   ` ticks above tilde symbol
}

function p5js() {
    return random(0, diam);
}

function rndDigits() {
    return randomDigits(0, diam);
}