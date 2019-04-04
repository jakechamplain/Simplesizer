# Simplesizer
simple-synthesizer to help highlight some fundamental elements of sound synthesis

## Libraries
This code uses libraries from the Processing Foundation's [p5.js library](https://p5js.org)
(currently just p5.js and p5.sound.js)

p5.js is licensed under the [GNU Lesser General Public License v2.1](https://github.com/processing/p5.js/blob/master/license.txt)

## Running the code
The code is pure JavaScript run on what is essentially a blank HTML webpage

There are a few ways to run and test the project, once you download all of the source files & libraries
1. Run the `index.html` file locally in the browser  
*** This has the potential to cause runtime errors, or run into some issue with [CORS policy](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) ***
2. Run the code on a localhost  
    *** Daniel Shiffman (The Coding Train) has a great video of this on [YouTube](https://www.youtube.com/watch?v=UCHzlUiDD10)  
    *** The p5.js github also has a [resource page](https://github.com/processing/p5.js/wiki/Local-server) outlining multiple ways to do this

## File Hierarchy
The HTML and JavaScript files are all in the simplesizer folder, and all of the p5 files are in the libraries folder, as is laid out in the repo. These folders should be in the same location to ensure that the libraries are properly referenced.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Project Status
* Currently, both oscillators function with either sine, square, triangle, or sawtooth waveforms. Pulse and noise waveforms still need to be implemented, because those are different data-types in p5.sound.js

* Cutoff and resonance filters are implemented, but the values that they cover may need some tweaking Basically, the frequency range that can be passed to them is rather wide, so I need to determine what would be a more practical range.

* Still need to add sliders to control Attack, Decay, Sustain, and Release parameters.

* Keys on the computer keyboard that access the 'piano keys' need to be added to the site. Currently, it mimics the on-screen keyboard from Logic Pro (just the piano keys so far) !['a'->c, 'w'->c#, ... ';'->E](https://macprovid.vo.llnwd.net/o43/hub/media/1001/10218/on-screen_keyboard.png)
