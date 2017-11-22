/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

import {extent, max, min, range as d3Range} from "d3-array";
import * as scales from "d3-scale";
import {select} from "d3-selection";
import {transition} from "d3-transition";

import {assign, attrize, BaseClass, closest, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {rtl as detectRTL, TextBox, textWidth, textWrap} from "d3plus-text";

import {default as date} from "./date";

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
      "stroke": "#000",
      "stroke-width": 1
    };
    this._domain = [0, 10];
    this._duration = 600;
    this._gridConfig = {
      "stroke": "#ccc",
      "stroke-width": 1
    };
    this._height = 400;
    this.orient("bottom");
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._paddingInner = 0.1;
    this._paddingOuter = 0.1;
    this._scale = "linear";
    this._shape = "Line";
    this._shapeConfig = {
      fill: "#000",
      height: d => d.tick ? 8 : 0,
      label: d => d.text,
      labelBounds: d => d.labelBounds,
      labelConfig: {
        fontColor: "#000",
        fontFamily: new TextBox().fontFamily(),
        fontResize: false,
        fontSize: constant(10),
        textAnchor: () => {
          const rtl = detectRTL();
          return this._orient === "left" ? rtl ? "start" : "end"
            : this._orient === "right" ? rtl ? "end" : "start"
            : "middle";
        },
        verticalAlign: () => this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle"
      },
      labelPadding: 0,
      r: d => d.tick ? 4 : 0,
      stroke: "#000",
      strokeWidth: 1,
      width: d => d.tick ? 8 : 0
    };
    this._tickSize = 5;
    this._titleClass = new TextBox();
    this._titleConfig = {
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
          domain = this._getDomain(),
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

    bar
      .call(attrize, this._barConfig)
      .attr(`${x}1`, this._getPosition(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0))
      .attr(`${x}2`, this._getPosition(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0))
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

    const domain = this._scale === "ordinal" ? ticks : extent(ticks);
    return ticks[0] > ticks[1] ? domain.reverse() : domain;

  }

  /**
      @memberof Axis
      @desc Returns a value's scale position, taking into account negative and positive log scales.
      @param {Number|String} *d*
      @private
  */
  _getPosition(d) {
    return d < 0 && this._d3ScaleNegative ? this._d3ScaleNegative(d) : this._d3Scale(d);
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
      @desc Returns the scale's ticks, taking into account negative and positive log scales.
      @private
  */
  _getTicks() {
    const tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);

    let ticks = [];
    if (this._d3ScaleNegative) {
      const negativeRange = this._d3ScaleNegative.range();
      const size = negativeRange[1] - negativeRange[0];
      ticks = this._d3ScaleNegative.ticks(Math.floor(size / tickScale(size)));
    }
    if (this._d3Scale) {
      const positiveRange = this._d3Scale.range();
      const size = positiveRange[1] - positiveRange[0];
      ticks = ticks.concat(this._d3Scale.ticks(Math.floor(size / tickScale(size))));
    }

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

    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .attr("width", `${this._width}px`)
        .attr("height", `${this._height}px`)
        .node());
    }

    const {width, height, x, y, horizontal, opposite} = this._position,
          clipId = `d3plus-Axis-clip-${this._uuid}`,
          flip = ["top", "left"].includes(this._orient),
          p = this._padding,
          parent = this._select,
          t = transition().duration(this._duration);

    let range = this._range ? this._range.slice() : [undefined, undefined];
    if (range[0] === void 0) range[0] = p;
    if (range[1] === void 0) range[1] = this[`_${width}`] - p;
    this._size = range[1] - range[0];
    if (this._scale === "ordinal" && this._domain.length > range.length) {
      range = d3Range(this._domain.length).map(d => this._size * (d / (this._domain.length - 1)) + range[0]);
    }

    const margin = this._margin = {top: 0, right: 0, bottom: 0, left: 0};

    if (this._title) {
      const {fontFamily, fontSize, lineHeight} = this._titleConfig;
      const titleWrap = textWrap()
        .fontFamily(typeof fontFamily === "function" ? fontFamily() : fontFamily)
        .fontSize(typeof fontSize === "function" ? fontSize() : fontSize)
        .lineHeight(typeof lineHeight === "function" ? lineHeight() : lineHeight)
        .width(this._size)
        .height(this[`_${height}`] - this._tickSize - p);
      const lines = titleWrap(this._title).lines.length;
      margin[this._orient] = lines * titleWrap.lineHeight() + p;
    }

    this._d3Scale = scales[`scale${this._scale.charAt(0).toUpperCase()}${this._scale.slice(1)}`]()
      .domain(this._scale === "time" ? this._domain.map(date) : this._domain);

    if (this._d3Scale.rangeRound) this._d3Scale.rangeRound(range);
    else this._d3Scale.range(range);

    if (this._d3Scale.round) this._d3Scale.round(true);
    if (this._d3Scale.paddingInner) this._d3Scale.paddingInner(this._paddingInner);
    if (this._d3Scale.paddingOuter) this._d3Scale.paddingOuter(this._paddingOuter);

    this._d3ScaleNegative = null;
    if (this._scale === "log") {
      const domain = this._d3Scale.domain();
      if (domain[0] === 0) domain[0] = 1;
      if (domain[domain.length - 1] === 0) domain[domain.length - 1] = -1;
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
        const percentScale = scales.scaleLog().domain([1, domain[domain[1] > 0 ? 1 : 0]]).range([0, 1]);
        const leftPercentage = percentScale(Math.abs(domain[domain[1] < 0 ? 1 : 0]));
        let zero = leftPercentage / (leftPercentage + 1) * (range[1] - range[0]);
        if (domain[0] > 0) zero = range[1] - range[0] - zero;
        this._d3ScaleNegative = this._d3Scale.copy();
        (domain[0] < 0 ? this._d3Scale : this._d3ScaleNegative)
          .domain([Math.sign(domain[1]), domain[1]])
          .range([range[0] + zero, range[1]]);
        (domain[0] < 0 ? this._d3ScaleNegative : this._d3Scale)
          .domain([domain[0], Math.sign(domain[0])])
          .range([range[0], range[0] + zero]);
      }
    }

    let ticks = this._ticks
      ? this._scale === "time" ? this._ticks.map(date) : this._ticks
      : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
        ? this._getTicks()
        : this._domain;

    let labels = this._labels
      ? this._scale === "time" ? this._labels.map(date) : this._labels
      : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
        ? this._getTicks()
        : ticks;

    ticks = ticks.slice();
    labels = labels.slice();

    if (this._scale === "log") labels = labels.filter(t => Math.abs(t).toString().charAt(0) === "1" && (this._d3Scale ? t !== -1 : t !== 1));

    const superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    const tickFormat = this._tickFormat ? this._tickFormat : d => {
      if (this._scale === "log") {
        const p = Math.round(Math.log(Math.abs(d)) / Math.LN10);
        const t = Math.abs(d).toString().charAt(0);
        let n = `10 ${`${p}`.split("").map(c => superscript[c]).join("")}`;
        if (t !== "1") n = `${t} x ${n}`;
        return d < 0 ? `-${n}` : n;
      }
      return this._d3Scale.tickFormat ? this._d3Scale.tickFormat(labels.length - 1)(d) : d;
    };

    if (this._scale === "time") {
      ticks = ticks.map(Number);
      labels = labels.map(Number);
    }
    else if (this._scale === "ordinal") {
      labels = labels.filter(label => ticks.includes(label));
    }

    ticks = ticks.sort((a, b) => this._getPosition(a) - this._getPosition(b));
    labels = labels.sort((a, b) => this._getPosition(a) - this._getPosition(b));

    const tickSize = this._shape === "Circle" ? this._shapeConfig.r
      : this._shape === "Rect" ? this._shapeConfig[width]
      : this._shapeConfig.strokeWidth;

    const tickGet = typeof tickSize !== "function" ? () => tickSize : tickSize;

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

    if (this._scale === "band") {
      this._space = this._d3Scale.bandwidth();
    }
    else if (labels.length > 1) {
      this._space = 0;
      for (let i = 0; i < labels.length - 1; i++) {
        const s = this._getPosition(labels[i + 1]) - this._getPosition(labels[i]);
        if (s > this._space) this._space = s;
      }
    }
    else this._space = this._size;

    // Measures size of ticks
    const textData = labels.map((d, i) => {

      const f = this._shapeConfig.labelConfig.fontFamily(d, i),
            s = this._shapeConfig.labelConfig.fontSize(d, i);

      const wrap = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined)
        .width(horizontal ? this._space * 2 : this._width - hBuff - p)
        .height(horizontal ? this._height - hBuff - p : this._space * 2);

      const res = wrap(tickFormat(d));
      res.lines = res.lines.filter(d => d !== "");
      res.d = d;
      res.fS = s;
      res.width = res.lines.length
        ? Math.ceil(max(res.lines.map(line => textWidth(line, {"font-family": f, "font-size": s})))) + s / 4
        : 0;
      res.height = res.lines.length ? Math.ceil(res.lines.length * (wrap.lineHeight() + 1)) : 0;
      res.offset = 0;
      res.hidden = false;
      if (res.width % 2) res.width++;

      return res;

    });

    textData.forEach((d, i) => {
      if (i) {
        const prev = textData[i - 1];
        if (!prev.offset && this._getPosition(d.d) - d[width] / 2 < this._getPosition(prev.d) + prev[width] / 2) {
          d.offset = prev[height] + this._padding;
        }
      }
    });

    const maxOffset = max(textData, d => d.offset);
    if (maxOffset) {
      textData.forEach(d => {
        if (d.offset) {
          d.offset = maxOffset;
          d[height] += maxOffset;
        }
      });
    }

    // Calculates new range, based on any text that may be overflowing.
    const rangeOuter = range.slice();
    const lastI = range.length - 1;
    if (this._scale !== "band" && textData.length) {

      const first = textData[0],
            last = textData[textData.length - 1];

      const firstB = min([this._getPosition(first.d) - first[width] / 2, range[0] - wBuff]);
      if (firstB < range[0]) {
        const d = range[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          this._size -= d;
          range[0] += d;
        }
        else if (this._range) {
          rangeOuter[0] -= d;
        }
      }

      const lastB = max([this._getPosition(last.d) + last[width] / 2, range[lastI] + wBuff]);
      if (lastB > range[lastI]) {
        const d = lastB - range[lastI];
        if (this._range === void 0 || this._range[lastI] === void 0) {
          this._size -= d;
          range[lastI] -= d;
        }
        else if (this._range) {
          rangeOuter[lastI] += d;
        }
      }

      if (range.length > 2) range = d3Range(this._domain.length).map(d => this._size * (d / (range.length - 1)) + range[0]);
      range = range.map(Math.round);
      if (this._d3ScaleNegative) {
        const negativeRange = this._d3ScaleNegative.range();
        this._d3ScaleNegative[this._d3ScaleNegative.rangeRound ? "rangeRound" : "range"](
          this._d3Scale && this._d3Scale.range()[0] < negativeRange[0]
            ? [negativeRange[0], range[1]]
            : [range[0], this._d3Scale ? negativeRange[1] : range[1]]
        );
        if (this._d3Scale) {
          const positiveRange = this._d3Scale.range();
          this._d3Scale[this._d3Scale.rangeRound ? "rangeRound" : "range"](
            range[0] < negativeRange[0]
              ? [range[0], positiveRange[1]]
              : [positiveRange[0], range[1]]
          );
        }
      }
      else {
        this._d3Scale[this._d3Scale.rangeRound ? "rangeRound" : "range"](range);
      }

    }

    if (this._scale === "band") {
      this._space = this._d3Scale.bandwidth();
    }
    else if (labels.length > 1) {
      this._space = 0;
      for (let i = 0; i < labels.length - 1; i++) {
        const s = this._getPosition(labels[i + 1]) - this._getPosition(labels[i]);
        if (s > this._space) this._space = s;
      }
    }
    else this._space = this._size;

    const tBuff = this._shape === "Line" ? 0 : hBuff;
    const bounds = this._outerBounds = {
      [height]: (max(textData, t => Math.ceil(t[height])) || 0) + (textData.length ? p : 0),
      [width]: rangeOuter[lastI] - rangeOuter[0],
      [x]: rangeOuter[0]
    };

    margin[this._orient] += hBuff;
    margin[opposite] = this._gridSize !== void 0 ? max([this._gridSize, tBuff]) : this[`_${height}`] - margin[this._orient] - bounds[height] - p;
    bounds[height] += margin[opposite] + margin[this._orient];
    bounds[y] = this._align === "start" ? this._padding
      : this._align === "end" ? this[`_${height}`] - bounds[height] - this._padding
      : this[`_${height}`] / 2 - bounds[height] / 2;

    const group = elem(`g#d3plus-Axis-${this._uuid}`, {parent});
    this._group = group;

    const grid = elem("g.grid", {parent: group}).selectAll("line")
      .data((this._gridSize !== 0 ? this._grid || ticks : []).map(d => ({id: d})), d => d.id);

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

    const labelHeight = max(textData, t => t.height) || 0;

    const labelOnly = labels.filter((d, i) => textData[i].lines.length && !ticks.includes(d));

    let tickData = ticks.concat(labelOnly)
      .map(d => {
        const data = textData.filter(td => td.d === d);
        const dataIndex = data.length ? textData.indexOf(data[0]) : undefined;
        const xPos = this._getPosition(d);

        let labelOffset = data.length ? data[0].offset : 0;

        const labelWidth = horizontal ? this._space : bounds.width - margin[this._position.opposite] - hBuff - margin[this._orient] + p;

        let prev = data.length && dataIndex > 0 ? textData.filter((td, ti) => !td.hidden && td.offset >= labelOffset && ti < dataIndex) : false;
        prev = prev.length ? prev[prev.length - 1] : false;
        let next = data.length && dataIndex < textData.length - 1 ? textData.filter((td, ti) => !td.hidden && td.offset >= labelOffset && ti > dataIndex) : false;
        next = next.length ? next[0] : false;

        const space = Math.min(prev ? xPos - this._getPosition(prev.d) : labelWidth, next ? this._getPosition(next.d) - xPos : labelWidth);
        if (data.length && data[0].width > space) {
          data[0].hidden = true;
          data[0].offset = labelOffset = 0;
        }

        const offset = margin[opposite],
              size = (hBuff + labelOffset) * (flip ? -1 : 1),
              yPos = flip ? bounds[y] + bounds[height] - offset : bounds[y] + offset;

        return {
          id: d,
          labelBounds: {
            x: horizontal ? -space / 2 : this._orient === "left" ? -labelWidth - p + size : size + p,
            y: horizontal ? this._orient === "bottom" ? size + p : size - p - labelHeight : -space / 2,
            width: horizontal ? space : labelWidth,
            height: horizontal ? labelHeight : space
          },
          size: ticks.includes(d) ? size : 0,
          text: labels.includes(d) ? tickFormat(d) : false,
          tick: ticks.includes(d),
          [x]: xPos + (this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0),
          [y]: yPos
        };
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
        ellipsis: d => d && d.length ? `${d}...` : ""
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
      .width(bounds[width])
      .x(horizontal ? bounds.x : this._orient === "left" ? bounds.x + margin[this._orient] / 2 - bounds[width] / 2 : bounds.x + bounds.width - margin[this._orient] / 2 - bounds[width] / 2)
      .y(horizontal ? this._orient === "bottom" ? bounds.y + bounds.height - margin.bottom + p : bounds.y : bounds.y - margin[this._orient] / 2 + bounds[width] / 2)
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
      @desc If *value* is specified, sets the grid style of the axis and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  gridConfig(_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
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
