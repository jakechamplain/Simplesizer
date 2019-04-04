function Filter(type, level, res) {
    this.type = type;
    this.cutoff = map(level, 0, 1, 10, 18000);
    this.resonance = map(res, 0, 1, 0.001, 50);
    this.filter = new p5.LowPass(this.cutoff);
    this.filter.res(this.resonance);
    this.filterChanged = false;

    this.update = function(currentFilter, currentFreq, currentRes) {
        this.filterChanged = false;
        let newFreq = map(currentFreq, 0, 1, 10, 18000);
        let newRes = map(currentRes, 0, 1, 0.001, 50);

        if (this.type !== currentFilter) {
            this.filterChanged = true;
            this.type = currentFilter;
            this.filter.setType(this.type);
        }
        
        if (this.cutoff !== newFreq) {
            this.cutoff = newFreq;
        }

        if (this.resonance !== newRes) {
            this.resonance = newRes;
        }
        this.filter.set(this.cutoff, this.resonance);
    }
}