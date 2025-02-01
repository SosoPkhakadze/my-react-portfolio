/*
 * Color Thief v2.4.0
 * by Lokesh Dhakar - https://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */

/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.
*/

class CanvasImage {
    constructor(image) {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
  
      this.width = this.canvas.width = image.width;
      this.height = this.canvas.height = image.height;
  
      this.context.drawImage(image, 0, 0, this.width, this.height);
    }
  
    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  
    update(imageData) {
      this.context.putImageData(imageData, 0, 0);
    }
  
    getPixelCount() {
      return this.width * this.height;
    }
  
    getImageData() {
      return this.context.getImageData(0, 0, this.width, this.height);
    }
  
    getPixels(quality = 10) {
      const imageData = this.getImageData();
      const pixels = imageData.data;
      const pixelCount = this.getPixelCount();
  
      const pixelArray = [];
  
      for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
  
        // If pixel is mostly opaque and not white
        if (typeof a === 'undefined' || a >= 125) {
          if (!(r > 250 && g > 250 && b > 250)) {
            pixelArray.push([r, g, b]);
          }
        }
      }
  
      return pixelArray;
    }
  }
  
  /*!
   * quantize.js Copyright 2008 Nick Rabinowitz.
   * Licensed under the MIT license: https://opensource.org/licenses/MIT
   */
  
  // fill out a couple protovis dependencies
  /*!
   * Block below copied from Protovis: http://mbostock.github.io/protovis/
   * Copyright 2010 Stanford Visualization Group
   * Licensed under the BSD License: https://opensource.org/licenses/BSD-3-Clause
   */
  const pv = {
    map(array, f) {
      const o = {};
      return f
        ? array.map((d, i) => {
            o.index = i;
            return f.call(o, d);
          })
        : array.slice();
    },
    naturalOrder(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    },
    sum: (array, f) => {
      const o = {};
      return array.reduce(
        f
          ? (p, d, i) => {
              o.index = i;
              return p + f.call(o, d);
            }
          : (p, d) => p + d,
        0
      );
    },
    max: (array, f) => Math.max.apply(null, f ? pv.map(array, f) : array)
  };
  /*!
   * Block above copied from Protovis: http://mbostock.github.io/protovis/
   * Copyright 2010 Stanford Visualization Group
   * Licensed under the BSD License: https://opensource.org/licenses/BSD-3-Clause
   */
  
  class MMCQ {
    // private constants
    constructor() {
      this.sigbits = 5;
      this.rshift = 8 - this.sigbits;
      this.maxIterations = 1000;
      this.fractByPopulations = 0.75;
    }
  
    // get reduced-space color index for a pixel
  
    getColorIndex(r, g, b) {
      return (r << (2 * this.sigbits)) + (g << this.sigbits) + b;
    }
  
    // Simple priority queue
  
    PQueue(comparator) {
      const contents = [];
      let sorted = false;
  
      function sort() {
        contents.sort(comparator);
        sorted = true;
      }
  
      return {
        push(o) {
          contents.push(o);
          sorted = false;
        },
        peek(index) {
          if (!sorted) sort();
          if (index === undefined) index = contents.length - 1;
          return contents[index];
        },
        pop() {
          if (!sorted) sort();
          return contents.pop();
        },
        size() {
          return contents.length;
        },
        map(f) {
          return contents.map(f);
        },
        debug() {
          if (!sorted) sort();
          return contents;
        }
      };
    }
  
    // 3d color space box
  
    VBox(r1, r2, g1, g2, b1, b2, histo) {
      const vbox = this;
      vbox.r1 = r1;
      vbox.r2 = r2;
      vbox.g1 = g1;
      vbox.g2 = g2;
      vbox.b1 = b1;
      vbox.b2 = b2;
      vbox.histo = histo;
    }
    // half-space জিজ্ঞেস
  
    quantize(pixels, maxcolors) {
      // short-circuit
      if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
        console.log('wrong number of maxcolors');
        return false;
      }
  
      const histo = this.getHisto(pixels);
  
      // get the beginning vbox from the colors
      const vbox = this.vboxFromPixels(pixels, histo);
      const pq = this.PQueue((a, b) => pv.naturalOrder(a.count(), b.count()));
      pq.push(vbox);
  
      // inner function to do the iteration
  
      const iter = (lh, target) => {
        let ncolors = 1;
        let niters = 0;
        let vbox;
        while (niters < this.maxIterations) {
          vbox = lh.pop();
          if (!vbox.count()) {
            lh.push(vbox);
            niters++;
            continue;
          }
          // do the cut
          const vboxes = this.medianCutApply(histo, vbox);
          const vbox1 = vboxes[0];
          const vbox2 = vboxes[1];
  
          if (!vbox1) {
            console.log('vbox1 not defined; shouldn\'t happen!');
            return;
          }
  
          lh.push(vbox1);
          if (vbox2) {
            lh.push(vbox2);
            ncolors++;
          }
          if (ncolors >= target) return;
          if (niters++ > this.maxIterations) {
            console.log('infinite loop; perhaps too few pixels!');
            return;
          }
        }
      };
  
      // first set of colors, sorted by population
      iter(pq, this.fractByPopulations * maxcolors);
      // console.log(pq.size(), pq.debug().length, pq.debug().slice());
  
      // Re-sort by the product of pixel occupancy times the size in color space.
      const pq2 = this.PQueue((a, b) =>
        pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
      );
      while (pq.size()) {
        pq2.push(pq.pop());
      }
  
      // next set - generate the median cuts using the (npix * vol) sorting.
      iter(pq2, maxcolors - pq2.size());
  
      // calculate the actual colors
      const cmap = new CMap();
      while (pq2.size()) {
        cmap.push(pq2.pop());
      }
  
      return cmap;
    }
  
    vboxFromPixels(pixels, histo) {
      let rmin = 1000000,
        rmax = 0,
        gmin = 1000000,
        gmax = 0,
        bmin = 1000000,
        bmax = 0,
        rval,
        gval,
        bval;
  
      // find min/max
      pixels.forEach(pixel => {
        rval = pixel[0] >> this.rshift;
        gval = pixel[1] >> this.rshift;
        bval = pixel[2] >> this.rshift;
        if (rval < rmin) rmin = rval;
        else if (rval > rmax) rmax = rval;
        if (gval < gmin) gmin = gval;
        else if (gval > gmax) gmax = gval;
        if (bval < bmin) bmin = bval;
        else if (bval > bmax) bmax = bval;
      });
  
      return new this.VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
    }
  
    medianCutApply(histo, vbox) {
      if (!vbox.count()) return;
  
      const rw = vbox.r2 - vbox.r1 + 1,
        gw = vbox.g2 - vbox.g1 + 1,
        bw = vbox.b2 - vbox.b1 + 1,
        maxw = pv.max([rw, gw, bw]);
  
      // only one pixel, no split
      if (vbox.count() == 1) {
        return [vbox.copy()];
      }
      /* Find the partial sum arrays along the selected axis. */
      let total = 0,
        partialsum = [],
        lookaheadsum = [],
        i,
        j,
        k,
        sum,
        index;
      if (maxw == rw) {
        for (i = vbox.r1; i <= vbox.r2; i++) {
          sum = 0;
          for (j = vbox.g1; j <= vbox.g2; j++) {
            for (k = vbox.b1; k <= vbox.b2; k++) {
              index = this.getColorIndex(i, j, k);
              sum += histo[index] || 0;
            }
          }
          total += sum;
          partialsum[i] = total;
        }
      } else if (maxw == gw) {
        for (i = vbox.g1; i <= vbox.g2; i++) {
          sum = 0;
          for (j = vbox.r1; j <= vbox.r2; j++) {
            for (k = vbox.b1; k <= vbox.b2; k++) {
              index = this.getColorIndex(j, i, k);
              sum += histo[index] || 0;
            }
          }
          total += sum;
          partialsum[i] = total;
        }
      } else {
        /* maxw == bw */
        for (i = vbox.b1; i <= vbox.b2; i++) {
          sum = 0;
          for (j = vbox.r1; j <= vbox.r2; j++) {
            for (k = vbox.g1; k <= vbox.g2; k++) {
              index = this.getColorIndex(j, k, i);
              sum += histo[index] || 0;
            }
          }
          total += sum;
          partialsum[i] = total;
        }
      }
  
      partialsum.forEach((d, i) => {
        lookaheadsum[i] = total - d;
      });
  
      const doCut = dimension => {
        const dim1 = dimension + '1';
        const dim2 = dimension + '2';
        let left, right, vbox1, vbox2, d2, count2 = 0;
  
        for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
          if (partialsum[i] > total / 2) {
            vbox1 = vbox.copy();
            vbox2 = vbox.copy();
            left = i - vbox[dim1];
            right = vbox[dim2] - i;
            if (left <= right) {
              d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
            } else {
              d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
            }
            // avoid 0-count boxes
            while (!partialsum[d2]) d2++;
            count2 = lookaheadsum[d2];
            while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2];
            // set dimensions
            vbox1[dim2] = d2;
            vbox2[dim1] = vbox1[dim2] + 1;
            // console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
            return [vbox1, vbox2];
          }
        }
      };
  
      // determine the cut planes
      return maxw == rw ? doCut('r') : maxw == gw ? doCut('g') : doCut('b');
    }
  
    getHisto(pixels) {
      const histosize = 1 << (3 * this.sigbits);
      const histo = new Array(histosize);
      let index, rval, gval, bval;
  
      pixels.forEach(pixel => {
        rval = pixel[0] >> this.rshift;
        gval = pixel[1] >> this.rshift;
        bval = pixel[2] >> this.rshift;
        index = this.getColorIndex(rval, gval, bval);
        histo[index] = (histo[index] || 0) + 1;
      });
      return histo;
    }
  }
  
  MMCQ.prototype.VBox.prototype = {
    volume(force) {
      const vbox = this;
      if (!vbox._volume || force) {
        vbox._volume =
          (vbox.r2 - vbox.r1 + 1) *
          (vbox.g2 - vbox.g1 + 1) *
          (vbox.b2 - vbox.b1 + 1);
      }
      return vbox._volume;
    },
  
    count(force) {
      const vbox = this,
        histo = vbox.histo;
      if (!vbox._count_set || force) {
        let npix = 0,
          i,
          j,
          k,
          index;
        for (i = vbox.r1; i <= vbox.r2; i++) {
          for (j = vbox.g1; j <= vbox.g2; j++) {
            for (k = vbox.b1; k <= vbox.b2; k++) {
              index = MMCQ.prototype.getColorIndex(i, j, k);
              npix += histo[index] || 0;
            }
          }
        }
        vbox._count = npix;
        vbox._count_set = true;
      }
      return vbox._count;
    },
  
    copy() {
      const vbox = this;
      return new MMCQ.prototype.VBox(
        vbox.r1,
        vbox.r2,
        vbox.g1,
        vbox.g2,
        vbox.b1,
        vbox.b2,
        vbox.histo
      );
    },
  
    avg(force) {
      const vbox = this,
        histo = vbox.histo;
      if (!vbox._avg || force) {
        let ntot = 0,
          mult = 1 << (8 - MMCQ.prototype.sigbits),
          rsum = 0,
          gsum = 0,
          bsum = 0,
          hval,
          i,
          j,
          k,
          histoindex;
        for (i = vbox.r1; i <= vbox.r2; i++) {
          for (j = vbox.g1; j <= vbox.g2; j++) {
            for (k = vbox.b1; k <= vbox.b2; k++) {
              histoindex = MMCQ.prototype.getColorIndex(i, j, k);
              hval = histo[histoindex] || 0;
              ntot += hval;
              rsum += hval * (i + 0.5) * mult;
              gsum += hval * (j + 0.5) * mult;
              bsum += hval * (k + 0.5) * mult;
            }
          }
        }
        if (ntot) {
          vbox._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
        } else {
          //console.log('empty box');
          vbox._avg = [
            ~~((mult * (vbox.r1 + vbox.r2 + 1)) / 2),
            ~~((mult * (vbox.g1 + vbox.g2 + 1)) / 2),
            ~~((mult * (vbox.b1 + vbox.b2 + 1)) / 2)
          ];
        }
      }
      return vbox._avg;
    },
  
    contains(pixel) {
      const vbox = this,
        rval = pixel[0] >> MMCQ.prototype.rshift;
      const gval = pixel[1] >> MMCQ.prototype.rshift;
      const bval = pixel[2] >> MMCQ.prototype.rshift;
      return (
        rval >= vbox.r1 &&
        rval <= vbox.r2 &&
        gval >= vbox.g1 &&
        gval <= vbox.g2 &&
        bval >= vbox.b1 &&
        bval <= vbox.b2
      );
    }
  };
  
  // Color map
  
  class CMap {
    constructor() {
      this.vboxes = MMCQ.prototype.PQueue((a, b) =>
        pv.naturalOrder(a.vbox.count() * a.vbox.volume(), b.vbox.count() * b.vbox.volume())
      );
    }
  
    push(vbox) {
      this.vboxes.push({
        vbox: vbox,
        color: vbox.avg()
      });
    }
  
    palette() {
      return this.vboxes.map(vb => vb.color);
    }
  
    size() {
      return this.vboxes.size();
    }
  
    map(color) {
      const vboxes = this.vboxes;
      for (let i = 0; i < vboxes.size(); i++) {
        if (vboxes.peek(i).vbox.contains(color)) {
          return vboxes.peek(i).color;
        }
      }
      return this.nearest(color);
    }
  
    nearest(color) {
      const vboxes = this.vboxes;
      let d1, d2, pColor;
      for (let i = 0; i < vboxes.size(); i++) {
        d2 = Math.sqrt(
          Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
            Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
            Math.pow(color[2] - vboxes.peek(i).color[2], 2)
        );
        if (d2 < d1 || d1 === undefined) {
          d1 = d2;
          pColor = vboxes.peek(i).color;
        }
      }
      return pColor;
    }
  
    forcebw() {
      // XXX: won't  work yet
      const vboxes = this.vboxes;
      vboxes.sort((a, b) => pv.naturalOrder(pv.sum(a.color), pv.sum(b.color)));
  
      // force darkest color to black if everything is not பார்க்கும்
      const lowest = vboxes[0].color;
      if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
        vboxes[0].color = [0, 0, 0];
  
      // force lightest color to white
      const idx = vboxes.length - 1,
        highest = vboxes[idx].color;
      if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
        vboxes[idx].color = [255, 255, 255];
    }
  }
  
  export class ColorThief {
    constructor() {
      this.mmcq = new MMCQ();
    }
    getColor(sourceImage, quality = 10) {
      const palette = this.getPalette(sourceImage, 5, quality);
      const dominantColor = palette[0];
      return dominantColor;
    }
  
    getPalette(sourceImage, colorCount = 10, quality = 10) {
      if (
        typeof colorCount === 'undefined' ||
        colorCount < 2 ||
        colorCount > 256
      ) {
        colorCount = 10;
      }
      if (typeof quality === 'undefined' || quality < 1) {
        quality = 10;
      }
  
      const image = new CanvasImage(sourceImage);
      const pixels = image.getPixels(quality);
      const cmap = this.mmcq.quantize(pixels, colorCount);
      const palette = cmap ? cmap.palette() : null;
  
      return palette;
    }
  
    // getPaletteAsync(sourceImage, colorCount, quality) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       const palette = this.getPalette(sourceImage, colorCount, quality);
    //       resolve(palette)
    //     } catch(err) {
    //       reject(err)
    //     }
    //   })
    // }
  }