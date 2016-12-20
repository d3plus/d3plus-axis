/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

import {max, min, range as d3Range} from "d3-array";
import * as scales from "d3-scale";
import {select} from "d3-selection";
import {transition} from "d3-transition";

import {attrize, BaseClass, closest, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {TextBox, textWidth, textWrap} from "d3plus-text";

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
      fontColor: "#000",
      fontFamily: new TextBox().fontFamily(),
      fontResize: false,
      fontSize: constant(10),
      height: d => d.tick ? 8 : 0,
      label: d => d.text,
      labelBounds: d => d.labelBounds,
      labelPadding: 0,
      r: d => d.tick ? 4 : 0,
      stroke: "#000",
      strokeWidth: 1,
      textAnchor: () => this._orient === "left" ? "end" : this._orient === "right" ? "start" : "middle",
      verticalAlign: () => this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle",
      width: d => d.tick ? 8 : 0
    };
    this._tickSize = 5;
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13,
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
          domain = this._d3Scale.domain(),
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

    bar
      .call(attrize, this._barConfig)
      .attr(`${x}1`, this._d3Scale(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0))
      .attr(`${x}2`, this._d3Scale(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0))
      .attr(`${y}1`, position)
      .attr(`${y}2`, position);

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
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
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
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.
      @param {Object} [*value*]
      @chainable
  */
  barConfig(_) {
    return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
      @chainable
  */
  domain(_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  grid(_) {
    return arguments.length ? (this._grid = _, this) : this._grid;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.
      @param {Object} [*value*]
      @chainable
  */
  gridConfig(_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.
      @param {Number} [*value* = undefined]
      @chainable
  */
  gridSize(_) {
    return arguments.length ? (this._gridSize = _, this) : this._gridSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
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
      @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  paddingInner(_) {
    return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  paddingOuter(_) {
    return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
      @chainable
  */
  range(_) {
    return arguments.length ? (this._range = _, this) : this._range;
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

    if (this._lineHeight === void 0) {
      this._lineHeight = (d, i) => this._shapeConfig.fontSize(d, i) * 1.1;
    }

    const {width, height, x, y, horizontal, opposite} = this._position,
          clipId = `d3plus-Axis-clip-${this._uuid}`,
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

    this._margin = {top: 0, right: 0, bottom: 0, left: 0};

    if (this._title) {
      const lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(this._size)
              .height(this[`_${height}`] - this._tickSize - p)
              (this._title);
      this._margin[this._orient] = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[`scale${this._scale.charAt(0).toUpperCase()}${this._scale.slice(1)}`]()
      .domain(this._scale === "time" ? this._domain.map(date) : this._domain);

    if (this._d3Scale.rangeRound) this._d3Scale.rangeRound(range);
    else this._d3Scale.range(range);

    if (this._d3Scale.round) this._d3Scale.round(true);
    if (this._d3Scale.paddingInner) this._d3Scale.paddingInner(this._paddingInner);
    if (this._d3Scale.paddingOuter) this._d3Scale.paddingOuter(this._paddingOuter);

    const tickScale = scales.scaleSqrt().domain([10, 400]).range([10, this._gridSize === 0 ? 50 : 75]);

    let ticks = this._ticks
              ? this._scale === "time" ? this._ticks.map(date) : this._ticks
              : this._d3Scale.ticks
              ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
              : this._domain;

    let labels = this._labels
               ? this._scale === "time" ? this._labels.map(date) : this._labels
               : this._d3Scale.ticks
               ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
               : ticks;

    const tickFormat = this._tickFormat ? this._tickFormat : this._d3Scale.tickFormat
                     ? this._d3Scale.tickFormat(labels.length - 1)
                     : d => d;

    if (this._scale === "time") {
      ticks = ticks.map(Number);
      labels = labels.map(Number);
    }

    const tickSize = this._shape === "Circle" ? this._shapeConfig.r
                   : this._shape === "Rect" ? this._shapeConfig[width]
                   : this._shapeConfig.strokeWidth;

    const tickGet = typeof tickSize !== "function" ? (d, i) => tickSize(d, i) : tickSize;

    const pixels = [];
    this._availableTicks = ticks;
    ticks.forEach((d, i) => {
      let s = tickGet({id: d, tick: true}, i);
      if (this._shape === "Circle") s *= 2;
      const t = this._d3Scale(d);
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
        const s = this._d3Scale(labels[i + 1]) - this._d3Scale(labels[i]);
        if (s > this._space) this._space = s;
      }
    }
    else this._space = this._size;

    // Measures size of ticks
    const textData = labels.map((d, i) => {

      const f = this._shapeConfig.fontFamily(d, i),
            s = this._shapeConfig.fontSize(d, i);

      const lh = this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : s * 1.1;

      const res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(horizontal ? this._space : this._width - hBuff - p)
        .height(horizontal ? this._height - hBuff - p : this._space)
        (tickFormat(d));

      res.lines = res.lines.filter(d => d !== "");
      res.d = d;
      res.fS = s;
      res.width = Math.ceil(max(res.lines.map(t => textWidth(t, {"font-family": f, "font-size": s})))) + s / 4;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      if (res.width % 2) res.width++;

      return res;

    });

    // Calculates new range, based on any text that may be overflowing.
    const rangeOuter = range.slice();
    const lastI = range.length - 1;
    if (this._scale !== "band" && textData.length) {

      const first = textData[0],
            last = textData[textData.length - 1];

      const firstB = min([this._d3Scale(first.d) - first[width] / 2, range[0] - wBuff]);
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

      const lastB = max([this._d3Scale(last.d) + last[width] / 2, range[lastI] + wBuff]);
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

      if (this._d3Scale.rangeRound) this._d3Scale.rangeRound(range);
      else this._d3Scale.range(range);

    }

    const tBuff = this._shape === "Line" ? 0 : hBuff;
    this._outerBounds = {
      [height]: (max(textData, t => t[height]) || 0) + (textData.length ? p : 0),
      [width]: rangeOuter[lastI] - rangeOuter[0],
      [x]: rangeOuter[0]
    };
    this._margin[opposite] = this._gridSize !== void 0 ? max([this._gridSize, tBuff]) : this[`_${height}`] - this._margin[this._orient] - this._outerBounds[height] - p * 2 - hBuff;
    this._margin[this._orient] += hBuff;
    this._outerBounds[height] += this._margin[opposite] + this._margin[this._orient];
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[`_${height}`] - this._outerBounds[height] - this._padding
                         : this[`_${height}`] / 2 - this._outerBounds[height] / 2;

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

    const labelHeight = max(textData, t => t.height) || 0,
          labelWidth = horizontal ? this._space * 1.1 : (this._outerBounds.width - this._margin[this._position.opposite] - hBuff - this._margin[this._orient] + p) * 1.1;
    let tickData = ticks
      .concat(labels.filter((d, i) => textData[i].lines.length && !ticks.includes(d)))
      .map(d => {
        const offset = this._margin[opposite],
              position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
              size = ["top", "left"].includes(this._orient) ? -hBuff : hBuff,
              sizeOffset = this._shape === "Line" ? size / 2 : size;
        return {
          id: d,
          labelBounds: {
            x: horizontal ? -labelWidth / 2 : this._orient === "left" ? -labelWidth - p + sizeOffset : sizeOffset + p,
            y: horizontal ? this._orient === "bottom" ? sizeOffset + p : sizeOffset - p - labelHeight : -labelHeight / 2,
            width: labelWidth,
            height: labelHeight
          },
          size: ticks.includes(d) ? size : 0,
          text: labels.includes(d) ? tickFormat(d) : false,
          tick: ticks.includes(d),
          [x]: this._d3Scale(d) + (this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0),
          [y]: position
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

    new TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(this._outerBounds.height)
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(elem("g.d3plus-Axis-title", {parent: group}).node())
      .text(d => d.text)
      .textAnchor("middle")
      .verticalAlign(this._orient === "bottom" ? "bottom" : "top")
      .width(this._outerBounds[width])
      .x(horizontal ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._margin[this._orient] / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._margin[this._orient] / 2 - this._outerBounds[width] / 2)
      .y(horizontal ? this._outerBounds.y : this._outerBounds.y - this._margin[this._orient] / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    this._lastScale = this._d3Scale;

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
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
      @desc If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.
      @param {String} [*value* = "Line"]
      @chainable
  */
  shape(_) {
    return arguments.length ? (this._shape = _, this) : this._shape;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.
      @param {Object} [*value*]
      @chainable
  */
  shapeConfig(_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).
      @param {Function} [*value*]
      @chainable
  */
  tickFormat(_) {
    return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  ticks(_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
      @chainable
  */
  tickSize(_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
      @chainable
  */
  title(_) {
    return arguments.length ? (this._title = _, this) : this._title;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  titleConfig(_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
