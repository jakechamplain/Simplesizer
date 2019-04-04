function SelectBox(x, y, w, h, types, name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.selectBox = [[], [], []];
    this.selected = 0;
    this.type = types[0];

    fill(150, 116, 150);
    rect(this.x, this.y, this.w, this.h);
    fill(124, 144, 219);
    rect(this.x - 10, this.y + 5, this.w - 25, 25);
    textSize(20);
    fill(highlight);
    text(name, this.x, this.y + 25);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            let xVal = 10 + this.x + i * 60;
            let yVal = this.y + (j + 1) * this.h / 3;
            let chosen = (i + j * 3 === this.selected) ? true: false;
            this.selectBox[i][j] = new selectRect(xVal, yVal, 15, 15, types[i + j * 3], chosen);
        }
    }

    this.update = function() {
        for (let i = 0; i <3; i++) {
            for (let j = 0; j < 2; j++) {
                this.selectBox[i][j].update();
                if (mouseIsPressed && this.selectBox[i][j].mouseIsOver) {
                    this.selectBox[i][j].selected = true;
                    this.selected = i + j * 3;
                    this.type = types[this.selected];
                    //console.log(this.type);
                } 
                else if (this.selected !== i + j * 3 && this.selectBox[i][j].selected) {
                    this.selectBox[i][j].selected = false;
                }
            }
        }
    }

    this.active = function() {
        for (let i = 0; i <3; i++) {
            for (let j = 0; j < 2; j++) {
                this.selectBox[i][j].active();
            }
        }
    }
}

function selectRect(x, y, w, h, waveName, selected) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.waveName = waveName;
    this.selected = selected;
    this.mouseIsOver = false;

    fill(highlight);
    rect(this.x, this.y, this.w, this.h);
    textSize(12);
    text(this.waveName, this.x, this.y + 30);

    this.update = function() {
        if (this.selected) {
            fill(bg);
            rect(this.x + 5, this.y + 5, this.w - 5, this.h - 5);
        }
        else {
            fill(highlight);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    this.active = function() {
        if (dist(this.x, this.y, mouseX, mouseY) < this.w) {
            this.mouseIsOver = true;
        } else {
            this.mouseIsOver = false;
        }
    }
}
