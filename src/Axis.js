import {attrize, BaseClass, constant, elem} from "d3plus-common";
import {TextBox, textWidth, textWrap} from "d3plus-text";

import {max} from "d3-array";
import * as scales from "d3-scale";
import {select} from "d3-selection";
import {transition} from "d3-transition";

/**
    @class Axis
    @extends BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
export default class Axis extends BaseClass {

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
    this._scale = "linear";
    this._textBoxConfig = {
      fontFamily: new TextBox().fontFamily(),
      fontResize: false,
      fontSize: constant(10)
    };
    this._tickConfig = {
      "stroke": "#000",
      "stroke-width": 1
    };
    this._tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
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
    const {height, x, y} = this._position;
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._gridLength : this._outerBounds[y] + this._gridLength;
    bar
      .call(attrize, this._barConfig)
      .attr(`${x}1`, this._d3Scale(this._d3Scale.domain()[0]))
      .attr(`${x}2`, this._d3Scale(this._d3Scale.domain()[1]))
      .attr(`${y}1`, position)
      .attr(`${y}2`, position);
  }

  /**
      @memberof Axis
      @desc Sets positioning for the clip rectangle.
      @param {D3Selection} *click*
      @private
  */
  _clipPosition(clip) {
    const {width, height, x, y} = this._position;
    const d = this._d3Scale.domain(),
          p = max([this._gridConfig["stroke-width"], this._tickConfig["stroke-width"]]),
          s = this._d3Scale(d[1]) - this._d3Scale(d[0]);
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._tickSize - this._gridLength : this._outerBounds[y];
    clip
      .attr(x, this._d3Scale(this._d3Scale.domain()[0]) - p)
      .attr(y, position)
      .attr(width, s + p * 2)
      .attr(height, this._gridLength + this._tickSize + p);
  }

  /**
      @memberof Axis
      @desc Sets positioning for the grid lines.
      @param {D3Selection} *lines*
      @private
  */
  _gridPosition(lines, last = false) {
    const {height, x, y} = this._position;
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._gridLength : this._outerBounds[y] + this._gridLength,
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? this._gridLength : -this._gridLength;
    lines
      .call(attrize, this._gridConfig)
      .attr(`${x}1`, d => scale(d.id))
      .attr(`${x}2`, d => scale(d.id))
      .attr(`${y}1`, position)
      .attr(`${y}2`, last ? position : position + size);
  }

  /**
      @memberof Axis
      @desc Sets positioning for the axis ticks.
      @param {D3Selection} *ticks*
      @private
  */
  _tickPosition(ticks, last = false) {
    const {height, x, y} = this._position;
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._gridLength : this._outerBounds[y] + this._gridLength,
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? -this._tickSize : this._tickSize;
    ticks
      .call(attrize, this._tickConfig)
      .attr(`${x}1`, d => scale(d.id))
      .attr(`${x}2`, d => scale(d.id))
      .attr(`${y}1`, position)
      .attr(`${y}2`, last ? position : position + size);
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.
      @param {Object} [*value*]
  */
  barConfig(_) {
    return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
  */
  domain(_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
  */
  grid(_) {
    return arguments.length ? (this._grid = _, this) : this._grid;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.
      @param {Object} [*value*]
  */
  gridConfig(_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.
      @param {Number} [*value* = undefined]
  */
  gridSize(_) {
    return arguments.length ? (this._gridSize = _, this) : this._gridSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof Axis
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
  */
  orient(_) {
    if (arguments.length) {
      const horizontal = ["top", "bottom"].includes(_);
      this._position = {
        width: horizontal ? "width" : "height",
        height: horizontal ? "height" : "width",
        x: horizontal ? "x" : "y",
        y: horizontal ? "y" : "x"
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
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
  */
  range(_) {
    return arguments.length ? (this._range = _, this) : this._range;
  }

  /**
      @memberof Axis
      @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  render(callback) {

    if (this._select === void 0) this.select(select("body").append("svg").attr("width", `${this._width}px`).attr("height", `${this._height}px`).node());

    const parent = this._select,
          t = transition().duration(this._duration);

    if (this._lineHeight === void 0) this._lineHeight = (d, i) => this._textBoxConfig.fontSize(d, i) * 1.1;

    const {width, height, x, y} = this._position;

    const clipId = `d3plus-ShapeLegend-clip-${this._uuid}`,
          p = this._padding;

    const range = this._range ? this._range.slice() : [undefined, undefined];
    if (range[0] === void 0) range[0] = p;
    if (range[1] === void 0) range[1] = this[`_${width}`] - p;
    let size = range[1] - range[0];

    this._titleHeight = 0;
    if (this._title) {
      const lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(size)
              .height(this._height - this._tickSize - p)
              (this._title);
      this._titleHeight = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[`scale${this._scale.charAt(0).toUpperCase()}${this._scale.slice(1)}`]()
      .domain(this._domain)
      .rangeRound(range);

    let ticks = this._ticks || this._d3Scale.ticks(Math.floor(size / this._tickScale(size)));
    const tickFormat = this._d3Scale.tickFormat(ticks.length - 1);
    if (!this._ticks) ticks = ticks.map(tickFormat).map(Number);
    const values = this._tickLabels || ticks;

    let space = 0;
    if (values.length > 1) {
      for (let i = 0; i < values.length; i++) {
        const s = this._d3Scale(values[i + 1]) - this._d3Scale(values[i]);
        if (s > space) space = s;
      }
    }
    else space = size;

    const textData = values.map((d, i) => {

      const f = this._textBoxConfig.fontFamily(d, i),
            s = this._textBoxConfig.fontSize(d, i);

      const lh = this._textBoxConfig.lineHeight ? this._textBoxConfig.lineHeight(d, i) : s * 1.1;

      const res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(space)
        .height(this._height - this._tickSize - p)
        (d);

      res.lines = res.lines.filter(d => d !== "");
      res.d = d;
      res.fS = s;
      res.width = Math.ceil(max(res.lines.map(t => textWidth(t, {"font-family": f, "font-size": s}))));
      res.height = Math.ceil(res.lines.length * (lh + 1));
      if (res.width % 2) res.width++;

      return res;

    });

    const rangeInit = range.slice();
    if (textData.length) {

      const first = textData[0],
            last = textData[textData.length - 1];

      const firstB = this._d3Scale(first.d) - first[width] / 2 - p;
      if (firstB < range[0]) {
        const d = range[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          size -= d;
          range[0] += d;
        }
        else if (this._range) {
          rangeInit[0] -= d;
        }
      }

      const lastB = this._d3Scale(last.d) + last[width] / 2 + p;
      if (lastB > range[1]) {
        const d = lastB - range[1];
        if (this._range === void 0 || this._range[1] === void 0) {
          size -= d;
          range[1] -= d;
        }
        else if (this._range) {
          rangeInit[1] += d;
        }
      }

      this._d3Scale.rangeRound(range);

    }

    const tPad = textData.length ? p * 2 : 0;
    this._outerBounds = {
      [height]: this._titleHeight + this._tickSize + (max(textData, t => t[height]) || 0) + tPad,
      [width]: rangeInit[1] - rangeInit[0],
      [x]: rangeInit[0]
    };
    this._gridLength = this._gridSize !== void 0 ? this._gridSize : this[`_${height}`] - this._outerBounds[height] - p * 2;
    this._outerBounds[height] += this._gridLength;
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[`_${height}`] - this._outerBounds[height]
                         : this[`_${height}`] / 2 - this._outerBounds[height] / 2;

    const group = elem(`g#d3plus-Axis-${clipId}`, {parent});
    const defs = elem("defs", {parent: group});
    const clip = elem(`clipPath#${clipId}`, {parent: defs});

    const axisClip = clip.selectAll("rect").data([null]);
    axisClip.enter().append("rect")
      .call(this._clipPosition.bind(this))
      .merge(axisClip).transition(t)
        .call(this._clipPosition.bind(this));

    const grid = elem("g.grid", {parent: group}).selectAll("line")
      .data((this._grid || ticks).map(d => ({id: d})), d => d.id);

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

    const lines = elem("g.ticks", {parent: group}).selectAll("line")
      .data(ticks.map(d => ({id: d})), d => d.id);

    lines.exit().transition(t)
      .attr("opacity", 0)
      .call(this._tickPosition.bind(this))
      .remove();

    lines.enter().append("line")
        .attr("opacity", 0)
        .attr("clip-path", `url(#${clipId})`)
        .call(this._tickPosition.bind(this), true)
      .merge(lines).transition(t)
        .attr("opacity", 1)
        .call(this._tickPosition.bind(this));

    const bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(t)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    const maxTextHeight = max(textData, t => t.height) || 0,
          maxTextWidth = max(textData, t => t.width + t.fS) || 0;

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
      .x(["top", "bottom"].includes(this._orient) ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._titleHeight / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._titleHeight / 2 - this._outerBounds[width] / 2)
      .y(["top", "bottom"].includes(this._orient) ? this._outerBounds.y : this._outerBounds.y - this._titleHeight / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    new TextBox()
      .data(values.filter((d, i) => textData[i].lines.length).map(d => ({id: d})))
      .duration(this._duration)
      .height(maxTextHeight)
      .select(elem("g.d3plus-Axis-ticks", {parent: group}).node())
      .text(d => tickFormat(d.id))
      .textAnchor(this._orient === "left" ? "end" : this._orient === "right" ? "start" : "middle")
      .verticalAlign(this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle")
      .width(maxTextWidth)
      .x((d, i) => {
        if (["top", "bottom"].includes(this._orient)) return this._d3Scale(d.id) - maxTextWidth / 2;
        return this._orient === "left" ? this._titleHeight + this._outerBounds.x - this._textBoxConfig.fontSize(values[i], i) / 2 : this._outerBounds.x + this._tickSize + this._gridLength + this._padding;
      })
      .y(d => {
        if (["left", "right"].includes(this._orient)) return this._d3Scale(d.id) - maxTextHeight / 2;
        return this._orient === "bottom" ? this._outerBounds.y + this._gridLength + this._tickSize + p : this._titleHeight + this._outerBounds.y;
      })
      .config(this._textBoxConfig)
      .render();

    this._lastScale = this._d3Scale;

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
  */
  scale(_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  }

  /**
      @memberof Axis
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  textBoxConfig(_) {
    return arguments.length ? (this._textBoxConfig = Object.assign(this._textBoxConfig, _), this) : this._textBoxConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.
      @param {Object} [*value*]
  */
  tickConfig(_) {
    return arguments.length ? (this._tickConfig = Object.assign(this._tickConfig, _), this) : this._tickConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
      @param {Array} [*value*]
  */
  tickLabels(_) {
    return arguments.length ? (this._tickLabels = _, this) : this._tickLabels;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
  */
  ticks(_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
  */
  tickSize(_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
  */
  title(_) {
    return arguments.length ? (this._title = _, this) : this._title;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
  */
  titleConfig(_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  }

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
