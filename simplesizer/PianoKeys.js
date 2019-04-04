function DrawKey(x, natural) {
    this.natural = natural;
    this.x = x;
    this.y = 500;
    this.pressedColor = color(116, 116, 173);
    this.keyIsPressed = false;

    if (this.natural) {
        this.w = 70;
        this.h = 195;
        this.keyColor = color(204, 204, 255);
    } else {
        this.w = 45;
        this.h = 120;
        this.keyColor = color(153, 153, 255);
    }

    noStroke();
    fill(this.keyColor);
    rect(this.x, this.y, this.w, this.h);

    this.update = function() {
        noStroke();
        if (this.keyIsPressed) {
            fill(this.pressedColor);
        } else {
            fill(this.keyColor);
        }
        rect(this.x, this.y, this.w, this.h);
    }
}

function PianoKeys() {
    noStroke();
    this.keys = [];
    var index, x;
    this.naturals = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16];
    this.accidentals = [1, 3, 6, 8, 10, 13, 15];

    for (let i = 0; i < 10; i++) {
        if (i < 3) {
            index = i * 2;
        } else if (i >= 3 && i < 7) {
            index = (i * 2) - 1;
        } else {
            index = (i * 2) - 2;
        }
        x = (75 * i) + 25;
        this.keys[index] = new DrawKey(x, true);
    }

    for (let i = 0; i < 7; i++) {
        if (i < 2) {
            index = (i * 2) + 1;
            x = (75 * i) + 75;
        } else if (i >= 2 && i < 5) {
            index = (i * 2) + 2;
            x = 75 * (i + 1) + 75;
        } else {
            index = (i * 2) + 3;
            x = 75 *(i + 2) + 75;
        }
        this.keys[index] = new DrawKey(x, false);
        //console.log(i, index);
    }
    var dad = 10;

    //console.log(this.keys[dad].x, this.keys[dad].y, this.keys[dad].w, this.keys[dad].h);

    this.update = function() {
        for (let i = 0; i < this.naturals.length; i++) {
            let keyIndex = this.naturals[i];
            this.keys[keyIndex].update();
        }
        for (let i = 0; i < this.accidentals.length; i++) {
            let keyIndex = this.accidentals[i];
            this.keys[keyIndex].update();
        }
    }

    this.keyPlayed = function(keyIndex) {
        this.keys[keyIndex].keyIsPressed = true;
    }

    this.keyUnPlayed = function(keyIndex) {
        this.keys[keyIndex].keyIsPressed = false;
    }
};