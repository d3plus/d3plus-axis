/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

import {extent, max, min, range as d3Range, ticks as d3Ticks} from "d3-array";
import {timeFormatDefaultLocale} from "d3-time-format";
import * as scales from "d3-scale";
import {select} from "d3-selection";
import {transition} from "d3-transition";

import {assign, attrize, BaseClass, closest, constant, elem} from "d3plus-common";
import {colorDefaults} from "d3plus-color";
import {formatAbbreviate, formatDate, formatLocale} from "d3plus-format";
import * as shapes from "d3plus-shape";
import {rtl as detectRTL, TextBox, textWrap} from "d3plus-text";

import {default as date} from "./date.js";
import {default as locale} from "./locale.js";

const floorPow = d => Math.pow(10, Math.floor(Math.log10(d)));

/**
 * Calculates ticks from a given scale (negative and/or positive)
 * @param {scale} scale A d3-scale object
 * @private
 */
function calculateTicks(scale, useData = false) {

  const tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
  const negativeRange = scale.range();
  const size = Math.abs(negativeRange[1] - negativeRange[0]);
  let step = Math.floor(size / tickScale(size));

  if (this._scale === "time" && this._data && this._data.length) {
    const dataExtent = extent(this._data);
    const distance = this._data.reduce((n, d, i, arr) => {
      if (i) {
        const dist = Math.abs(d - arr[i - 1]);
        if (dist < n) n = dist;
      }
      return n;
    }, Infinity);
    const newStep = Math.round((dataExtent[1] - dataExtent[0]) / distance);
    step = useData ? min([step * 2, newStep]) : min([step, newStep]);
  }
  const ticks = scale.ticks(step);
  const domain = scale.domain();
  if (!ticks.find(d => +d === +domain[0])) ticks.unshift(domain[0]);
  if (!ticks.find(d => +d === +domain[1])) ticks.push(domain[1]);
  return ticks;
}

/**
    @class Axis
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data.
*/
export default class Axis extends BaseClass {

  /**
      @memberof Axis
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

    this._align = "middle";
    this._barConfig = {
      "stroke": "#999",
      "stroke-width": 1
    };
    this._data = [];
    this._domain = [0, 10];
    this._duration = 600;
    this._gridConfig = {
      "stroke": "#eee",
      "stroke-width": 1
    };
    this._gridLog = false;
    this._height = 400;
    this._labelOffset = false;
    this._labelRotation = false;
    this.orient("bottom");
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._paddingInner = 0.1;
    this._paddingOuter = 0.1;
    this._scale = "linear";
    this._scalePadding = 0.5;
    this._shape = "Line";
    this._shapeConfig = {
      fill: "#999",
      height: d => d.tick ? 8 : 0,
      label: d => d.text,
      labelBounds: d => d.labelBounds,
      labelConfig: {
        fontColor: "#999",
        fontFamily: new TextBox().fontFamily(),
        fontResize: false,
        fontSize: constant(14),
        padding: 0,
        textAnchor: () => {
          const rtl = detectRTL();
          return this._orient === "left" ? rtl ? "start" : "end"
            : this._orient === "right" ? rtl ? "end" : "start"
            : this._labelRotation ? this._orient === "bottom" ? "end" : "start" : "middle";
        },
        verticalAlign: () => this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle"
      },
      r: d => d.tick ? 4 : 0,
      stroke: "#999",
      strokeWidth: 1,
      width: d => d.tick ? 8 : 0
    };
    this._tickSize = 8;
    this._tickSuffix = "normal";
    this._tickUnit = 0;
    this._timeLocale = undefined;
    this._titleClass = new TextBox();
    this._titleConfig = {
      fontColor: colorDefaults.dark,
      fontSize: 12,
      textAnchor: "middle"
    };
    this._width = 400;

  }

  /**
      @memberof Axis
      @desc Sets positioning for the axis bar.
      @param {D3Selection} *bar*
      @private
  */
  _barPosition(bar) {

    const {height, x, y, opposite} = this._position,
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

    const x1mod = this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth()
      : this._scale === "point" ? this._d3Scale.step() * this._d3Scale.padding()
      : 0;

    const x2mod = this._scale === "band" ? this._d3Scale.step()
      : this._scale === "point" ? this._d3Scale.step() * this._d3Scale.padding()
      : 0;

    const sortedDomain = (this._d3ScaleNegative ? this._d3ScaleNegative.domain() : []).concat(this._d3Scale ? this._d3Scale.domain() : []).sort((a, b) => a - b);

    bar
      .call(attrize, this._barConfig)
      .attr(`${x}1`, this._getPosition(sortedDomain[0]) - x1mod)
      .attr(`${x}2`, this._getPosition(sortedDomain[sortedDomain.length - 1]) + x2mod)
      .attr(`${y}1`, position)
      .attr(`${y}2`, position);

  }

  /**
      @memberof Axis
      @desc Returns the scale's domain, taking into account negative and positive log scales.
      @private
  */
  _getDomain() {

    let ticks = [];
    if (this._d3ScaleNegative) ticks = this._d3ScaleNegative.domain();
    if (this._d3Scale) ticks = ticks.concat(this._d3Scale.domain());

    const domain = ["band", "ordinal", "point"].includes(this._scale) ? ticks : extent(ticks);
    return ticks[0] > ticks[1] ? domain.reverse() : domain;

  }

  /**
      @memberof Axis
      @desc Returns a value's scale position, taking into account negative and positive log scales.
      @param {Number|String} *d*
      @private
  */
  _getPosition(d) {
    return this._scale === "log" && d === 0
      ? (this._d3Scale || this._d3ScaleNegative).range()[this._d3Scale ? 0 : 1]
      : (this._scale === "log" && d < 0 ? this._d3ScaleNegative || (() => 0) : this._d3Scale)(d);
  }

  /**
      @memberof Axis
      @desc Returns the scale's range, taking into account negative and positive log scales.
      @private
  */
  _getRange() {

    let ticks = [];
    if (this._d3ScaleNegative) ticks = this._d3ScaleNegative.range();
    if (this._d3Scale) ticks = ticks.concat(this._d3Scale.range());
    return ticks[0] > ticks[1] ? extent(ticks).reverse() : extent(ticks);

  }

  /**
      @memberof Axis
      @desc Returns the scale's labels, taking into account negative and positive log scales.
      @private
  */
  _getLabels() {
    let labels = [];
    if (this._d3ScaleNegative) labels = labels.concat(calculateTicks.bind(this)(this._d3ScaleNegative, false));
    if (this._d3Scale) labels = labels.concat(calculateTicks.bind(this)(this._d3Scale, false));
    return labels;
  }

  /**
      @memberof Axis
      @desc Returns the scale's ticks, taking into account negative and positive log scales.
      @private
  */
  _getTicks() {
    let ticks = [];
    if (this._d3ScaleNegative) ticks = ticks.concat(calculateTicks.bind(this)(this._d3ScaleNegative, true));
    if (this._d3Scale) ticks = ticks.concat(calculateTicks.bind(this)(this._d3Scale, true));
    return ticks;
  }

  /**
      @memberof Axis
      @desc Sets positioning for the grid lines.
      @param {D3Selection} *lines*
      @private
  */
  _gridPosition(lines, last = false) {
    const {height, x, y, opposite} = this._position,
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
          scale = last ? this._lastScale || this._getPosition.bind(this) : this._getPosition.bind(this),
          size = ["top", "left"].includes(this._orient) ? offset : -offset,
          xDiff = this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0,
          xPos = d => scale(d.id) + xDiff;
    lines
      .call(attrize, this._gridConfig)
      .attr(`${x}1`, xPos)
      .attr(`${x}2`, xPos)
      .attr(`${y}1`, position)
      .attr(`${y}2`, last ? position : position + size);
  }

  /**
      @memberof Axis
      @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  render(callback) {

    /**
     * Creates an SVG element to contain the axis if none
     * has been specified using the "select" method.
     */
    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .attr("width", `${this._width}px`)
        .attr("height", `${this._height}px`)
        .node());
    }

    const timeLocale = this._timeLocale || locale[this._locale] || locale["en-US"];
    timeFormatDefaultLocale(timeLocale).format();

    /**
     * Declares some commonly used variables.
     */
    const {width, height, x, y, horizontal, opposite} = this._position,
          clipId = `d3plus-Axis-clip-${this._uuid}`,
          flip = ["top", "left"].includes(this._orient),
          p = this._padding,
          parent = this._select,
          rangeOuter = [p, this[`_${width}`] - p],
          t = transition().duration(this._duration);

    const tickValue = this._shape === "Circle" ? this._shapeConfig.r
      : this._shape === "Rect" ? this._shapeConfig[width]
      : this._shapeConfig.strokeWidth;
    const tickGet = typeof tickValue !== "function" ? () => tickValue : tickValue;

    /**
     * Zeros out the margins for re-calculation.
     */
    const margin = this._margin = {top: 0, right: 0, bottom: 0, left: 0};

    let labels, range, ticks;

    /**
     * Constructs the tick formatter function.
     */
    const tickFormat = this._tickFormat ? this._tickFormat : d => {
      if (isNaN(d) || ["band", "ordinal", "point"].includes(this._scale)) {
        return d;
      }
      else if (this._scale === "time") {
        return formatDate(d, (this._data || labels).map(date)).replace(/^Q/g, timeLocale.quarter);
      }
      else if (this._scale === "linear" && this._tickSuffix === "smallest") {
        const locale = typeof this._locale === "object" ? this._locale : formatLocale[this._locale];
        const {separator, suffixes} = locale;
        const suff = d >= 1000 ? suffixes[this._tickUnit + 8] : "";
        const tick = d / Math.pow(10, 3 * this._tickUnit);
        const number = formatAbbreviate(tick, locale, `,.${tick.toString().length}r`);
        return `${number}${separator}${suff}`;
      }
      else {
        return formatAbbreviate(d, this._locale);
      }
    };

    /**
     * (Re)calculates the internal d3 scale
     * @param {} newRange
     */
    function setScale(newRange = this._range) {

      /**
       * Calculates the internal "range" array to use, including
       * fallbacks if not specified with the "range" method.
       */
      range = newRange ? newRange.slice() : [undefined, undefined];
      let [minRange, maxRange] = rangeOuter;
      if (this._range) {
        if (this._range[0] !== undefined) minRange = this._range[0];
        if (this._range[this._range.length - 1] !== undefined) maxRange = this._range[this._range.length - 1];
      }
      if (range[0] === undefined || range[0] < minRange) range[0] = minRange;
      if (range[1] === undefined || range[1] > maxRange) range[1] = maxRange;
      const sizeInner = maxRange - minRange;
      if (this._scale === "ordinal" && this._domain.length > range.length) {
        if (newRange === this._range) {
          const buckets = this._domain.length + 1;
          range = d3Range(buckets)
            .map(d => range[0] + sizeInner * (d / (buckets - 1)))
            .slice(1, buckets);
          range = range.map(d => d - range[0] / 2);
        }
        else {
          const buckets = this._domain.length;
          const size = range[1] - range[0];
          range = d3Range(buckets)
            .map(d => range[0] + size * (d / (buckets - 1)));
        }
      }
      else if (newRange === this._range) {
        const tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
        const domain = this._scale === "time" ? this._domain.map(date) : this._domain;
        const scaleTicks = d3Ticks(domain[0], domain[1], Math.floor(sizeInner / tickScale(sizeInner)));
        ticks = (this._ticks
          ? this._scale === "time" ? this._ticks.map(date) : this._ticks
          : scaleTicks).slice();

        labels = (this._labels
          ? this._scale === "time" ? this._labels.map(date) : this._labels
          : scaleTicks).slice();
        const buckets = labels.length;

        if (buckets) {
          const pad = Math.ceil(sizeInner / buckets / 2);
          range = [range[0] + pad, range[1] - pad];
        }

      }

      /**
       * Sets up the initial d3 scale, using this._domain and the
       * previously defined range variable.
       */
      const scale = `scale${this._scale.charAt(0).toUpperCase()}${this._scale.slice(1)}`;

      this._d3Scale = scales[scale]()
        .domain(this._scale === "time" ? this._domain.map(date) : this._domain)
        .range(range);

      if (this._d3Scale.padding) this._d3Scale.padding(this._scalePadding);
      if (this._d3Scale.paddingInner) this._d3Scale.paddingInner(this._paddingInner);
      if (this._d3Scale.paddingOuter) this._d3Scale.paddingOuter(this._paddingOuter);

      /**
       * Constructs a separate "negative only" scale for logarithmic
       * domains, as they cannot pass zero.
       */
      this._d3ScaleNegative = null;
      if (this._scale === "log") {
        const domain = this._d3Scale.domain();
        if (domain[0] === 0) {
          const smallestNumber = min([min(this._data), Math.abs(domain[1])]);
          domain[0] = smallestNumber === 0 || smallestNumber === 1 ? 1e-6 : smallestNumber <= 1 ? floorPow(smallestNumber) : 1;
          if (domain[1] < 0) domain[0] *= -1;
        }
        else if (domain[domain.length - 1] === 0) {
          const smallestNumber = min([min(this._data), Math.abs(domain[0])]);
          domain[domain.length - 1] = smallestNumber === 0 || smallestNumber === 1 ? 1e-6 : smallestNumber <= 1 ? floorPow(smallestNumber) : 1;
          if (domain[0] < 0) domain[domain.length - 1] *= -1;
        }
        const range = this._d3Scale.range();
        if (domain[0] < 0 && domain[domain.length - 1] < 0) {
          this._d3ScaleNegative = this._d3Scale.copy()
            .domain(domain)
            .range(range);
          this._d3Scale = null;
        }
        else if (domain[0] > 0 && domain[domain.length - 1] > 0) {
          this._d3Scale
            .domain(domain)
            .range(range);
        }
        else {
          const percentScale = scales.scaleLinear()
            .domain(domain)
            .range([0, 1]);
          const leftPercentage = percentScale(0);
          const zero = leftPercentage * (range[1] - range[0]);
          const smallestPositive = min([min(this._data.filter(d => d >= 0)), Math.abs(domain[1])]);
          const smallestNegative = min([min(this._data.filter(d => d < 0 || Object.is(d, -0))), Math.abs(domain[0])]);
          const smallestPosPow = smallestPositive === 0 ? 1e-6 : smallestPositive <= 1 ? floorPow(smallestPositive) : 1;
          const smallestNegPow = smallestNegative === 0 ? -1e-6 : smallestNegative <= 1 ? floorPow(smallestNegative) : 1;
          const smallestNumber = min([smallestPosPow, smallestNegPow]);
          this._d3ScaleNegative = this._d3Scale.copy();
          (domain[0] < 0 ? this._d3Scale : this._d3ScaleNegative)
            .domain([domain[0] < 0 ? smallestNumber : -smallestNumber, domain[1]])
            .range([range[0] + zero, range[1]]);
          (domain[0] < 0 ? this._d3ScaleNegative : this._d3Scale)
            .domain([domain[0], domain[0] < 0 ? -smallestNumber : smallestNumber])
            .range([range[0], range[0] + zero]);
        }
      }

      /**
       * Determines the of values array to use
       * for the "ticks" and the "labels"
       */
      ticks = (this._ticks
        ? this._scale === "time" ? this._ticks.map(date) : this._ticks
        : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
          ? this._getTicks() : this._domain).slice();

      labels = (this._labels
        ? this._scale === "time" ? this._labels.map(date) : this._labels
        : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
          ? this._getLabels() : ticks).slice();

      if (this._scale === "log") {
        const tens = labels.filter((t, i) =>
          !i || i === labels.length - 1 ||
          Math.abs(t).toString().charAt(0) === "1" &&
          (this._d3Scale ? t !== -1 : t !== 1)
        );
        if (tens.length > 2) {
          labels = tens;
        }
        else if (labels.length >= 10) {
          labels = labels.filter(t => t % 5 === 0 || tickFormat(t).substr(-1) === "1");
        }
        if (labels.includes(-1) && labels.includes (1) && labels.some(d => d > 10 || d < 10)) {
          labels.splice(labels.indexOf(-1), 1);
        }
      }
      if (this._scale === "time") {
        ticks = ticks.map(Number);
        labels = labels.map(Number);
      }
      ticks = ticks.sort((a, b) => this._getPosition(a) - this._getPosition(b));
      labels = labels.sort((a, b) => this._getPosition(a) - this._getPosition(b));

      /**
       * Get the smallest suffix.
       */
      if (this._scale === "linear" && this._tickSuffix === "smallest") {
        const suffixes = labels.filter(d => d >= 1000);
        if (suffixes.length > 0) {
          const min = Math.min(...suffixes);
          let i = 1;
          while (i && i < 7) {
            const n = Math.pow(10, 3 * i);
            if (min / n >= 1) {
              this._tickUnit = i;
              i += 1;
            }
            else {
              break;
            }
          }
        }
      }

      /**
       * Removes ticks when they overlap other ticks.
       */
      const pixels = [];
      this._availableTicks = ticks;
      ticks.forEach((d, i) => {
        let s = tickGet({id: d, tick: true}, i);
        if (this._shape === "Circle") s *= 2;
        const t = this._getPosition(d);
        if (!pixels.length || Math.abs(closest(t, pixels) - t) > s * 2) pixels.push(t);
        else pixels.push(false);
      });
      ticks = ticks.filter((d, i) => pixels[i] !== false);
      this._visibleTicks = ticks;

    }
    setScale.bind(this)();

    /**
     * Calculates the space available for a given label.
     * @param {Object} datum
     */
    function calculateSpace(datum, diff = 1) {
      const {i, position} = datum;
      if (this._scale === "band") {
        return this._d3Scale.bandwidth();
      }
      else {
        const prevPosition = i - diff < 0 ? textData.length === 1 || !this._range ? rangeOuter[0] : (position - textData[i + diff].position) / 2 - position : position - (position - textData[i - diff].position) / 2;
        const prevSpace = Math.abs(position - prevPosition);
        const nextPosition = i + diff > textData.length - 1 ? textData.length === 1 || !this._range ? rangeOuter[1] : (position - textData[i - diff].position) / 2 - position : position - (position - textData[i + diff].position) / 2;
        const nextSpace = Math.abs(position - nextPosition);
        return min([prevSpace, nextSpace]) * 2;
      }
    }

    /**
     * Pre-calculates the size of the title, if defined, in order
     * to adjust the internal margins.
     */
    if (this._title) {
      const {fontFamily, fontSize, lineHeight} = this._titleConfig;
      const titleWrap = textWrap()
        .fontFamily(typeof fontFamily === "function" ? fontFamily() : fontFamily)
        .fontSize(typeof fontSize === "function" ? fontSize() : fontSize)
        .lineHeight(typeof lineHeight === "function" ? lineHeight() : lineHeight)
        .width(range[range.length - 1] - range[0] - p * 2)
        .height(this[`_${height}`] - this._tickSize - p * 2);
      const lines = titleWrap(this._title).lines.length;
      margin[this._orient] = lines * titleWrap.lineHeight() + p;
    }

    let hBuff = this._shape === "Circle"
          ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) : this._shapeConfig.r
          : this._shape === "Rect"
            ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
            : this._tickSize,
        wBuff = tickGet({tick: true});

    if (typeof hBuff === "function") hBuff = max(ticks.map(hBuff));
    if (this._shape === "Rect") hBuff /= 2;
    if (typeof wBuff === "function") wBuff = max(ticks.map(wBuff));
    if (this._shape !== "Circle") wBuff /= 2;

    const {fontFamily, fontSize} = this._shapeConfig.labelConfig;

    /**
     * Calculates the space each label would take up, given
     * the provided this._space size.
     */
    let textData = labels
      .map((d, i) => {

        const fF = typeof fontFamily === "function" ? fontFamily(d, i) : fontFamily,
              fS = typeof fontSize === "function" ? fontSize(d, i) : fontSize,
              position = this._getPosition(d);

        const lineHeight = this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : fS * 1.4;
        return {d, i, fF, fS, lineHeight, position};

      });

    /**
     * Calculates the text wrapping and size of a given textData object.
     * @param {Object} datum
     */
    function calculateLabelSize(datum) {
      const {d, i, fF, fS, rotate, space} = datum;

      const h = rotate ? "width" : "height",
            w = rotate ? "height" : "width";

      const wSize = min([this._maxSize, this._width]);
      const hSize = min([this._maxSize, this._height]);

      const wrap = textWrap()
        .fontFamily(fF)
        .fontSize(fS)
        .lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined);
        
      wrap[w](horizontal ? space : wSize - hBuff - p - this._margin.left - this._margin.right);
      wrap[h](horizontal ? hSize - hBuff - p - this._margin.top - this._margin.bottom : space);

      const res = wrap(tickFormat(d));
      res.lines = res.lines.filter(d => d !== "");

      res.width = res.lines.length ? Math.ceil(max(res.widths)) + fS / 4 : 0;
      if (res.width % 2) res.width++;

      res.height = res.lines.length ? Math.ceil(res.lines.length * wrap.lineHeight()) + fS / 4 : 0;
      if (res.height % 2) res.height++;

      return res;

    }

    /** Calculates label offsets */
    function calculateOffset(arr = []) {
      let offset = 0;

      arr.forEach(datum => {
        const prev = arr[datum.i - 1];

        const h = datum.rotate && horizontal || !datum.rotate && !horizontal ? "width" : "height",
              w = datum.rotate && horizontal || !datum.rotate && !horizontal ? "height" : "width";

        if (!prev) {
          offset = 1;
        }
        else if (prev.position + prev[w] / 2 > datum.position - datum[w] / 2) {
          if (offset) {
            datum.offset = prev[h];
            offset = 0;
          }
          else offset = 1;
        }
      });
    }

    textData = textData
      .map(datum => {
        datum.rotate = this._labelRotation;
        datum.space = calculateSpace.bind(this)(datum);
        const res = calculateLabelSize.bind(this)(datum);
        return Object.assign(res, datum);
      });

    const offsetEnabled = this._labelOffset && textData.some(d => d.truncated);

    if (this._labelRotation) {
      textData = textData
        .map(datum => {
          datum.rotate = true;
          const res = calculateLabelSize.bind(this)(datum);
          return Object.assign(datum, res);
        });
    }
    else if (offsetEnabled) {

      textData = textData
        .map(datum => {

          datum.space = calculateSpace.bind(this)(datum, 2);
          const res = calculateLabelSize.bind(this)(datum);
          return Object.assign(datum, res);
        });

      calculateOffset.bind(this)(textData);

    }

    /**
     * "spillover" will contain the pixel spillover of the first and last label,
     * and then adjust the scale range accordingly.
     */
    const spillover = [0, 0];
    for (let index = 0; index < 2; index++) {
      const datum = textData[index ? textData.length - 1 : 0];
      if (!datum) break;
      const {height, position, rotate, width} = datum;
      const compPosition = index ? rangeOuter[1] : rangeOuter[0];
      const halfSpace = (rotate || !horizontal ? height : width) / 2;
      const spill = index ? position + halfSpace - compPosition : position - halfSpace - compPosition;
      spillover[index] = spill;
    }

    const first = range[0];
    const last = range[range.length - 1];
    const newRange = [first - spillover[0], last - spillover[1]];
    if (this._range) {
      if (this._range[0] !== undefined) newRange[0] = this._range[0];
      if (this._range[this._range.length - 1] !== undefined) newRange[1] = this._range[this._range.length - 1];
    }

    if (newRange[0] !== first || newRange[1] !== last) {
      setScale.bind(this)(newRange);

      textData = labels
        .map((d, i) => {

          const fF = typeof fontFamily === "function" ? fontFamily(d, i) : fontFamily,
                fS = typeof fontSize === "function" ? fontSize(d, i) : fontSize,
                position = this._getPosition(d);

          const lineHeight = this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : fS * 1.4;
          return {d, i, fF, fS, lineHeight, position};

        });

      textData = textData
        .map(datum => {
          datum.rotate = this._labelRotation;
          datum.space = calculateSpace.bind(this)(datum, offsetEnabled ? 2 : 1);
          const res = calculateLabelSize.bind(this)(datum);
          return Object.assign(res, datum);
        });
      calculateOffset.bind(this)(textData);
    }

    const labelHeight = max(textData, t => t.height) || 0;
    this._labelRotation = horizontal && this._labelRotation === undefined
      ? textData.some(datum => {
        const {i, height, position, truncated} = datum;
        const prev = textData[i - 1];
        return truncated || i && prev.position + prev.height / 2 > position - height / 2;
      }) : this._labelRotation;

    const globalOffset = this._labelOffset ? max(textData, d => d.offset || 0) : 0;
    textData.forEach(datum => datum.offset = datum.offset ? globalOffset : 0);

    const tBuff = this._shape === "Line" ? 0 : hBuff;
    const bounds = this._outerBounds = {
      [height]: (max(textData, t => Math.ceil(t[t.rotate || !horizontal ? "width" : "height"] + t.offset)) || 0) + (textData.length ? p : 0),
      [width]: rangeOuter[rangeOuter.length - 1] - rangeOuter[0],
      [x]: rangeOuter[0]
    };

    bounds[height] = max([this._minSize, bounds[height]]);

    margin[this._orient] += hBuff;
    margin[opposite] = this._gridSize !== undefined ? max([this._gridSize, tBuff]) : this[`_${height}`] - margin[this._orient] - bounds[height] - p;
    bounds[height] += margin[opposite] + margin[this._orient];
    bounds[y] = this._align === "start" ? this._padding
      : this._align === "end" ? this[`_${height}`] - bounds[height] - this._padding
      : this[`_${height}`] / 2 - bounds[height] / 2;

    const group = elem(`g#d3plus-Axis-${this._uuid}`, {parent});
    this._group = group;

    const grid = elem("g.grid", {parent: group}).selectAll("line")
      .data((this._gridSize !== 0 ? this._grid || this._scale === "log" && !this._gridLog ? labels : ticks : []).map(d => ({id: d})), d => d.id);

    grid.exit().transition(t)
      .attr("opacity", 0)
      .call(this._gridPosition.bind(this))
      .remove();

    grid.enter().append("line")
        .attr("opacity", 0)
        .attr("clip-path", `url(#${clipId})`)
        .call(this._gridPosition.bind(this), true)
      .merge(grid).transition(t)
        .attr("opacity", 1)
        .call(this._gridPosition.bind(this));

    const labelOnly = labels.filter((d, i) => textData[i].lines.length && !ticks.includes(d));

    const rotated = textData.some(d => d.rotate);

    let tickData = ticks.concat(labelOnly)
      .map(d => {

        const data = textData.find(td => td.d === d);

        const xPos = this._getPosition(d);
        const space = data ? data.space : 0;
        const lines = data ? data.lines.length : 1;
        const lineHeight = data ? data.lineHeight : 1;

        const labelOffset = data && this._labelOffset ? data.offset : 0;

        const labelWidth = horizontal ? space : bounds.width - margin[this._position.opposite] - hBuff - margin[this._orient] + p;

        const offset = margin[opposite],
              size = (hBuff + labelOffset) * (flip ? -1 : 1),
              yPos = flip ? bounds[y] + bounds[height] - offset : bounds[y] + offset;

        const tickConfig = {
          id: d,
          labelBounds: rotated && data
            ? {
              x: -data.width / 2 + data.fS / 4,
              y: this._orient === "bottom" ? size + p + (data.width - lineHeight * lines) / 2 : size - p * 2 - (data.width + lineHeight * lines) / 2,
              width: data.width,
              height: data.height
            } : {
              x: horizontal ? -space / 2 : this._orient === "left" ? -labelWidth - p + size : size + p,
              y: horizontal ? this._orient === "bottom" ? size + p : size - p - labelHeight : -space / 2,
              width: horizontal ? space : labelWidth,
              height: horizontal ? labelHeight : space
            },
          rotate: data ? data.rotate : false,
          size: labels.includes(d) ? size : this._data.find(t => +t === d) ? Math.ceil(size / 2) : 0,
          text: labels.includes(d) ? tickFormat(d) : false,
          tick: ticks.includes(d),
          [x]: xPos + (this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0),
          [y]: yPos
        };

        return tickConfig;

      });

    if (this._shape === "Line") {
      tickData = tickData.concat(tickData.map(d => {
        const dupe = Object.assign({}, d);
        dupe[y] += d.size;
        return dupe;
      }));
    }
    
    new shapes[this._shape]()
      .data(tickData)
      .duration(this._duration)
      .labelConfig({
        ellipsis: d => d && d.length ? `${d}...` : "",
        rotate: d => d.rotate ? -90 : 0
      })
      .select(elem("g.ticks", {parent: group}).node())
      .config(this._shapeConfig)
      .render();

    const bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(t)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    this._titleClass
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(margin[this._orient])
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(elem("g.d3plus-Axis-title", {parent: group}).node())
      .text(d => d.text)
      .verticalAlign("middle")
      .width(range[range.length - 1] - range[0])
      .x(horizontal ? range[0] : this._orient === "left" ? bounds.x + margin.left / 2 - (range[range.length - 1] - range[0]) / 2 : bounds.x + bounds.width - margin.right / 2 - (range[range.length - 1] - range[0]) / 2)
      .y(horizontal ? this._orient === "bottom" ? bounds.y + bounds.height - margin.bottom : bounds.y : range[0] + (range[range.length - 1] - range[0]) / 2 - margin[this._orient] / 2)
      .config(this._titleConfig)
      .render();

    this._lastScale = this._getPosition.bind(this);

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the axis line style and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  barConfig(_) {
    return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
  }

  /**
      @memberof Axis
      @desc An array of data points, which helps determine which ticks should be shown and which time resolution should be displayed.
      @param {Array} [*value*]
      @chainable
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance.
      @param {Array} [*value* = [0, 10]]
      @chainable
  */
  domain(_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance.
      @param {Number} [*value* = 600]
      @chainable
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid values of the axis and returns the current class instance.
      @param {Array} [*value*]
      @chainable
  */
  grid(_) {
    return arguments.length ? (this._grid = _, this) : this._grid;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid config of the axis and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  gridConfig(_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid behavior of the axis when scale is logarithmic and returns the current class instance.
      @param {Boolean} [*value* = false]
      @chainable
  */
  gridLog(_) {
    return arguments.length ? (this._gridLog = _, this) : this._gridLog;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid size of the axis and returns the current class instance.
      @param {Number} [*value* = undefined]
      @chainable
  */
  gridSize(_) {
    return arguments.length ? (this._gridSize = _, this) : this._gridSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the axis and returns the current class instance.
      @param {Number} [*value* = 100]
      @chainable
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance.
      @param {Array} [*value*]
      @chainable
  */
  labels(_) {
    return arguments.length ? (this._labels = _, this) : this._labels;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets whether offsets will be used to position some labels further away from the axis in order to allow space for the text.
      @param {Boolean} [*value* = false]
      @chainable
   */
  labelOffset(_) {
    return arguments.length ? (this._labelOffset = _, this) : this._labelOffset;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets whether whether horizontal axis labels are rotated -90 degrees.
      @param {Boolean} [*value* = false]
      @chainable
   */
  labelRotation(_) {
    return arguments.length ? (this._labelRotation = _, this) : this._labelRotation;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the maximum size allowed for the space that contains the axis tick labels and title.
      @param {Number}
      @chainable
   */
  maxSize(_) {
    return arguments.length ? (this._maxSize = _, this) : this._maxSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the minimum size alloted for the space that contains the axis tick labels and title.
      @param {Number}
      @chainable
   */
  minSize(_) {
    return arguments.length ? (this._minSize = _, this) : this._minSize;
  }

  /**
      @memberof Axis
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
      @chainable
  */
  orient(_) {
    if (arguments.length) {

      const horizontal = ["top", "bottom"].includes(_),
            opps = {top: "bottom", right: "left", bottom: "top", left: "right"};

      this._position = {
        horizontal,
        width: horizontal ? "width" : "height",
        height: horizontal ? "height" : "width",
        x: horizontal ? "x" : "y",
        y: horizontal ? "y" : "x",
        opposite: opps[_]
      };

      return this._orient = _, this;

    }
    return this._orient;
  }

  /**
      @memberof Axis
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  outerBounds() {
    return this._outerBounds;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance.
      @param {Number} [*value* = 10]
      @chainable
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  paddingInner(_) {
    return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  paddingOuter(_) {
    return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value.
      @param {Array} [*value*]
      @chainable
  */
  range(_) {
    return arguments.length ? (this._range = _, this) : this._range;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the axis and returns the current class instance.
      @param {String} [*value* = "linear"]
      @chainable
  */
  scale(_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  }

  /**
      @memberof Axis
      @desc Sets the "padding" property of the scale, often used in point scales.
      @param {Number} [*value* = 0.5]
      @chainable
  */
  scalePadding(_) {
    return arguments.length ? (this._scalePadding = _, this) : this._scalePadding;
  }

  /**
      @memberof Axis
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick shape constructor and returns the current class instance.
      @param {String} [*value* = "Line"]
      @chainable
  */
  shape(_) {
    return arguments.length ? (this._shape = _, this) : this._shape;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick style of the axis and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  shapeConfig(_) {
    return arguments.length ? (this._shapeConfig = assign(this._shapeConfig, _), this) : this._shapeConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick formatter and returns the current class instance.
      @param {Function} [*value*]
      @chainable
  */
  tickFormat(_) {
    return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the axis and returns the current class instance.
      @param {Array} [*value*]
      @chainable
  */
  ticks(_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the axis and returns the current class instance.
      @param {Number} [*value* = 5]
      @chainable
  */
  tickSize(_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  }

  /**
      @memberof Axis
      @desc Sets the behavior of the abbreviations when you are using linear scale. This method accepts two options: "normal" (uses formatAbbreviate to determinate the abbreviation) and "smallest" (uses suffix from the smallest tick as reference in every tick).
      @param {String} [*value* = "normal"]
      @chainable
  */
  tickSuffix(_) {
    return arguments.length ? (this._tickSuffix = _, this) : this._tickSuffix;
  }

  /**
      @memberof Axis
      @desc Defines a custom locale object to be used in time scale. This object must include the following properties: dateTime, date, time, periods, days, shortDays, months, shortMonths. For more information, you can revise [d3p.d3-time-format](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormatLocale).
      @param {Object} [*value* = undefined]
      @chainable
  */
  timeLocale(_) {
    return arguments.length ? (this._timeLocale = _, this) : this._timeLocale;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the axis and returns the current class instance.
      @param {String} [*value*]
      @chainable
  */
  title(_) {
    return arguments.length ? (this._title = _, this) : this._title;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  titleConfig(_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the axis and returns the current class instance.
      @param {Number} [*value* = 400]
      @chainable
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
