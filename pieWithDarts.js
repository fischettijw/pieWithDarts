const diam = 750;
const dartMinimumStop = 300000;
const dartMaximumStop = 10000000;
const batchDarts = 10000;
const lowStop = 3.14155;
const highStop = 3.14163;
const drawGraphic = true;

let dartWeight, darts, inCircle;
let ratio, pie, pieDiv;
let seed, randomMethod, digitsMethod;

function initialize() {
    dartWeight = 1;
    darts = 0;
    inCircle = 0;
    ratio = 0;
    pie = 0;
    pieDiv;
    seed = null; // use null for no seed
    randomMethod = rndDigits; // rndStandard or rndDigits
    digitsMethod = digitsOfE; // rndDigits==> digitsOfPie or digitsOfE
    if (seed != null) {
        randomSeed(seed);
    }
}

function setup() {
    initialize();
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
        if ((pie > lowStop && pie < highStop && darts > dartMinimumStop) || darts >= 10000000) {
            noLoop();
            break;
        }
    }
}

function output() {
    pieDiv.html(`&nbsp Diameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${diam} <br> &nbsp  
    Batch Darts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${batchDarts} <br> &nbsp 
    Simulated Pie ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${nf(pie,1,5)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ${lowStop}0 - ${highStop}0 <br> &nbsp  
    Number of Darts ;&nbsp;&nbsp;&nbsp${darts} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp \> ${dartMinimumStop} \< ${dartMaximumStop}<br> &nbsp 
    % Deviation ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp${nf((PI - pie) * 100 / PI,1,5)} % <br> &nbsp 
    randomMethod &nbsp;&nbsp;&nbsp;&nbsp ${randomMethod} &nbsp;&nbsp ${seed}<br>&nbsp ${digitsMethod.substring(0,80)}`);
}

function rndStandard() {
    return random(0, diam);
}

function rndDigits() {
    return randomDigits(0, diam);
}