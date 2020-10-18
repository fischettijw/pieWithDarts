let rndIndex = 0;


function randomSeedDigits(seed) {
    if (seed == null) {
        rndIndex = 0;
    } else {
        rndIndex = seed;
    }
}

function randomDigits(min, max) {
    const high = max - min;
    const numOfDigits = floor(high).toString().length;
    const ratio = high / pow(10, numOfDigits);

    digits = digitsMethod;

    let rndPie = 0;
    for (let i = 0; i < numOfDigits; i++) {
        rndPie += digits[rndIndex] * pow(10, (numOfDigits - 1) - i);
        rndIndex++;
    }
    rndPie = floor(min + (rndPie * ratio));

    if (rndIndex >= (digits.length - numOfDigits)) {
        rndIndex = 0;
    }

    return rndPie;
}