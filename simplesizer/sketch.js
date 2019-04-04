
var centerX;
var cnv, oscillatorsBox, cuttoffResonanceBox, adsrBox;
var osc1Knob, osc2Knob, cutoffKnob, resKnob;
var osc1WaveSelector, osc2WaveSelector;
var pianoKeyboard;
var highlight, bg;
var octave = 4;
var polyOscs = [];
var cutoffFilter;

var waveNames = ['sine', 'square', 'triangle', 'sawtooth', 'pulse', 'noise'];
var filterNames = ['lowpass', 'highpass', 'bandpass', 'peaking', 'notch', 'allpass'] ;
// these values are the key-codes that coorespond to keys on the (computer) keyboard
// meant to mimic piano keys
// starts on c, ends on E
// same index order as the frequencies found in PolyOsc.js keyNote() function
//              a   w   s   e   d   f   t   g   y   h   u   j   k   o   l   p   ;
var keyArray = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76, 80, 186];


function centerCanvas() {
    centerX = (windowWidth - width) / 2;
    cnv.position(centerX, 50);
}

function windowResized() {
    centerCanvas();
}

function mousePressed() {
    osc1Knob.active();
    osc1Knob.clickY = mouseY;
    osc2Knob.active();
    osc2Knob.clickY = mouseY;
    cutoffKnob.active();
    cutoffKnob.clickY = mouseY;
    resKnob.active();
    resKnob.clickY = mouseY;

    osc1WaveSelector.active();
    osc2WaveSelector.active();
    cutoffFilterSelector.active();
    
}

function keysPlaying() {
    // selected waveform, value assigned in waveform.js -> Waveform class -> update() function
    for (let i = 0; i < polyOscs.length; i++) {
        for (let j = 0; j < keyArray.length; j++) {
            if (keyIsDown(keyArray[j])) {
                if (!(j in polyOscs[i].voices)) {
                    polyOscs[i].addVoice(octave, j, cutoffFilter.filter);
                    pianoKeyboard.keyPlayed(j);
                    //polyOscs[i].playTone(j);
                }
            } else {
                if (j in polyOscs[i].voices) {
                    polyOscs[i].endTone(j);
                    pianoKeyboard.keyUnPlayed(j);
                }
            }
        }
    }
}


function setup() {
    cnv = createCanvas(800, 800);
    centerCanvas();
    highlight = color(204, 204, 255);
    bg = color(51, 34, 68);
    background(bg);
    angleMode(DEGREES);
    textFont('Verdana');

    // create working areas for the oscillators (rect 1),
    // cutoffKnob and resKnobonance (rect 2), and adsr envelopes (rect 2)
    noStroke();
    fill(153, 153, 255);
    oscillatorsBox = rect(25, 25, 200, 450);
    
    fill(136, 136, 187);    
    cuttoffResonanceBox = rect(250, 25, 200, 450);    

    fill(68, 85, 120);
    adsrBox = rect(475, 25, 300, 450);

    // draw control modules within resKnobpective areas
    osc1Knob = new Knob(125, 75, 50, 0.5);
    osc2Knob = new Knob(125, 275, 50, 0);
    cutoffKnob = new Knob(350, 75, 50, 1);
    resKnob = new Knob(350, 275, 50, 0);

    osc1WaveSelector = new SelectBox(25, 125, 200, 100, waveNames, 'OSC > 1');
    osc2WaveSelector = new SelectBox(25, 325, 200, 100, waveNames, 'OSC > 2');
    cutoffFilterSelector = new SelectBox(250, 125, 200, 100, filterNames, 'CUTOFF >');

    polyOscs[0] = new PolyOsc(osc1WaveSelector.type, octave, 0, osc1Knob.level);
    polyOscs[1] = new PolyOsc(osc2WaveSelector.type, octave, 0, osc2Knob.level);
    cutoffFilter = new Filter(cutoffFilterSelector.type, cutoffKnob.level, resKnob.level);

    
    // label for CUTOFF
    /*
    fill(150, 116, 150);
    rect(250, 125, 200, 100);
    fill(124, 144, 219);
    rect(240, 130, 175, 25);
    textSize(20);
    fill(highlight);
    text('CUTOFF >', 250, 150);
    */

    // label for RESONANCE
    fill(150, 116, 150);
    rect(250, 325, 200, 50);
    fill(124, 144, 219);
    rect(240, 330, 175, 25);
    textSize(20);
    fill(highlight);
    text('RESONANCE >', 250, 350);

    //kb = new Keyboard();
    pianoKeyboard = new PianoKeys(bg);
    stroke(50);
    strokeWeight(4);
    fill(0);
    rect(500, 1000, 80, 100);
    noStroke();
}

function draw() {
    osc1Knob.update();
    osc2Knob.update();
    cutoffKnob.update();
    resKnob.update();

    osc1WaveSelector.update();
    osc2WaveSelector.update();
    cutoffFilterSelector.update();

    polyOscs[0].update(waveNames[osc1WaveSelector.selected], osc1Knob.level);
    polyOscs[1].update(waveNames[osc2WaveSelector.selected], osc2Knob.level);
    cutoffFilter.update(filterNames[cutoffFilterSelector.selected], cutoffKnob.level, resKnob.level);

    pianoKeyboard.update();
    
    keysPlaying();
}
