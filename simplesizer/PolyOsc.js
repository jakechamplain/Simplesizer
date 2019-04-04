function keyNote(octave, index) {
    let factor = pow(2, (octave - 4));
    notes = [261.63 * factor,  // 0  c
            277.18 * factor,   // 1  c sharp/d flat
            293.66 * factor,   // 2  d
            311.13 * factor,   // 3  d sharp/e flat
            329.63 * factor,   // 4  e
            349.23 * factor,   // 5  f
            369.99 * factor,   // 6  f sharp/g flat
            392.00 * factor,   // 7  g
            415.30 * factor,   // 8  g sharp/a flat
            440.00 * factor,   // 9  a
            466.16 * factor,   // 10 a sharp/b flat
            493.88 * factor,   // 11 b
            523.25 * factor,   // 12 C
            554.37 * factor,   // 13 C sharp/D flat
            587.33 * factor,   // 14 D
            622.25 * factor,   // 15 D sharp/E flat
            659.26 * factor,   // 16 E
            698.46 * factor];  // 17 F

    return notes[index];
}

function Voice(octave, noteIndex, waveform) {
    this.freq = keyNote(octave, noteIndex);
    this.waveform = waveform;
    this.osc = new p5.Oscillator(this.freq, this.waveform);
    this.isPlaying = false;
}

function PolyOsc(waveform, amplitude) {
    this.waveform = waveform;
    this.amplitude = amplitude;
    this.voices = [];

    this.addVoice = function(octave, noteIndex, filter) {
        this.voices[noteIndex] = new Voice(octave, noteIndex, this.waveform);
        this.voices[noteIndex].osc.amp(this.amplitude);
        this.voices[noteIndex].osc.disconnect();
        this.voices[noteIndex].osc.connect(filter);
        this.playTone(noteIndex);
        //console.log(this.voices);
    }

    this.playTone = function(noteIndex) {
        if (!this.voices[noteIndex].isPlaying) {
            this.voices[noteIndex].isPlaying = true;
            this.voices[noteIndex].osc.start();
        }
    }

    this.endTone = function(noteIndex) {
        if (this.voices[noteIndex] !== undefined && this.voices[noteIndex].isPlaying) {
            this.voices[noteIndex].isPlaying = false;
            this.voices[noteIndex].osc.disconnect();
            this.voices[noteIndex].osc.stop();
            delete this.voices[noteIndex].osc;
            delete this.voices[noteIndex];
        }
    }

    this.update = function(currentWaveform, currentAmp) {
        let updateWaveform = false, updateAmp = false;

        if (this.waveform !== currentWaveform) {
            updateWaveform = true;
            this.waveform = currentWaveform;
        }

        if (this.amplitude !== currentAmp) {
            updateAmp = true;
            this.amplitude = currentAmp;
        }

        if (this.voices.length > 0) {
            for (let index in this.voices) {
                if (updateWaveform) {
                    this.voices[index].osc.setType(this.waveform);
                }
                if (updateAmp) {
                    this.voices[index].osc.amp(this.amplitude);
                }
            }
        }

    }

};