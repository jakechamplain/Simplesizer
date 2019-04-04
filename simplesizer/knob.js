function Knob(h, k, d, level) {
    this.h = h;
    this.k = k;
    this.d = d;
    this.x = this.h;
    this.y = this.k + d / 2;
    this.clickY;
    this.angle = 0;
    this.startAngle = level * 360;
    this.isClicked = false;
    this.mouseIsOver = false;
    this.level = level;

    this.calculateCoordinates = function(diff) {
        var tempAngle = this.startAngle + diff;
        if (tempAngle <= 8) {
            this.x = this.h - 3;
            this.y = this.k + 24;
            this.angle = 8;
        }
        else if (tempAngle > 8 && tempAngle <= 360) {
            this.x = this.h - (25 * sin(tempAngle));
            this.y = this.k + (25 * cos(tempAngle));
            this.angle = tempAngle;
        }
        else if (tempAngle > 360) {
            this.x = this.h;
            this.y = this.k + this.d / 2;
            this.angle = 360;
        }
    }

    this.calculateCoordinates(0);

    this.update = function() {
        push();
        
        if (mouseIsPressed && this.mouseIsOver) {
            //console.log(angle);
            this.calculateCoordinates(this.clickY - mouseY);
        }
        else if (this.isClicked) {
            this.isClicked = false;
            this.startAngle = this.angle;
        }
        this.level =  (this.angle * 0.28) / 100;
        //fill(40, 110, 110);
        fill(122, 130, 172);
        stroke(204, 204, 255);
        strokeWeight(4);
        this.knob = ellipse(this.h, this.k, this.d);
        stroke(204, 204, 255);
        strokeWeight(4);
        //translate(this.h, this.k);
        //rotate(this.angle);
        //this.line = line(0, 0, this.x, this.y);
        this.line = line(this.h, this.k, this.x, this.y);
        pop();
    }

    this.active = function() {
        this.isClicked = true;
        if (dist(this.h, this.k, mouseX, mouseY) < this.d) {
            this.mouseIsOver = true;
        } else {
            this.mouseIsOver = false;
        }
    }
};