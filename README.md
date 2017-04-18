# d3plus-axis

[![NPM Release](http://img.shields.io/npm/v/d3plus-axis.svg?style=flat)](https://www.npmjs.org/package/d3plus-axis) [![Build Status](https://travis-ci.org/d3plus/d3plus-axis.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-axis) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-axis.svg?style=flat)](https://david-dm.org/d3plus/d3plus-axis) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat)](https://gitter.im/d3plus/)

Beautiful javascript scales and axes.

## Installing

If you use NPM, run `npm install d3plus-axis --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-axis/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-axis.v0.3.full.min.js"></script>
```

[width]: 600
[height]: 300

## Getting Started

d3plus-axis extrapolates on the ideas presented in [d3-axis](https://github.com/d3/d3-axis), most notably by adding grid lines and fitting the axis within the allotted space. To create a bottom axis in an SVG group defined like this:

```html
<svg width=600 height=300>
  <g id="my-axis"></g>
</svg>
```

Here is the javascript needed:

```js
var bottom = new d3plus.AxisBottom()
  .select("#my-axis")
  .domain([0, 10])
  .width(600)
  .height(300)
  .render();
```

The [d3plus-axis](https://github.com/d3plus/d3plus-axis) module makes all four orientations available as shorthand methods for the generalized [Axis](https://github.com/d3plus/d3plus-axis#Axis) class that they all extend. These axes are the brains behind [d3plus-plot](https://github.com/d3plus/d3plus-plot).


[<kbd><img src="/example/getting-started.png" width="600px" /></kbd>](https://d3plus.org/examples/d3plus-axis/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-axis/getting-started/) to view this example live on the web.


### More Examples

 * [Changing Axis Orientation](http://d3plus.org/examples/d3plus-axis/axis-orient/)
 * [Only Showing Specific Tick Labels](http://d3plus.org/examples/d3plus-axis/labels/)
 * [Axis w/ Time Scale](http://d3plus.org/examples/d3plus-axis/scale-time/)
 * [Tick Label Formatting](http://d3plus.org/examples/d3plus-axis/tickFormat/)
 * [Setting Custom Ticks](http://d3plus.org/examples/d3plus-axis/ticks/)

## API Reference

##### Classes
* [Axis](#Axis)
* [AxisBottom](#AxisBottom)
* [AxisLeft](#AxisLeft)
* [AxisRight](#AxisRight)
* [AxisTop](#AxisTop)

##### Functions
* [date](#date) - Parses numbers and strings to valid Javascript Date obejcts.

---

<a name="Axis"></a>
#### **Axis** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L17)


This is a global class. It extends all of the methods and functionality of <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>.


* [Axis](#Axis) ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
    * [new Axis()](#new_Axis_new)
    * [.render([*callback*])](#Axis.render) ↩︎
    * [.align([*value*])](#Axis.align) ↩︎
    * [.barConfig([*value*])](#Axis.barConfig) ↩︎
    * [.domain([*value*])](#Axis.domain) ↩︎
    * [.duration([*value*])](#Axis.duration) ↩︎
    * [.grid([*value*])](#Axis.grid) ↩︎
    * [.gridConfig([*value*])](#Axis.gridConfig) ↩︎
    * [.gridSize([*value*])](#Axis.gridSize) ↩︎
    * [.height([*value*])](#Axis.height) ↩︎
    * [.labels([*value*])](#Axis.labels) ↩︎
    * [.orient([*orient*])](#Axis.orient) ↩︎
    * [.outerBounds()](#Axis.outerBounds)
    * [.padding([*value*])](#Axis.padding) ↩︎
    * [.paddingInner([*value*])](#Axis.paddingInner) ↩︎
    * [.paddingOuter([*value*])](#Axis.paddingOuter) ↩︎
    * [.range([*value*])](#Axis.range) ↩︎
    * [.scale([*value*])](#Axis.scale) ↩︎
    * [.select([*selector*])](#Axis.select) ↩︎
    * [.shape([*value*])](#Axis.shape) ↩︎
    * [.shapeConfig([*value*])](#Axis.shapeConfig) ↩︎
    * [.tickFormat([*value*])](#Axis.tickFormat) ↩︎
    * [.ticks([*value*])](#Axis.ticks) ↩︎
    * [.tickSize([*value*])](#Axis.tickSize) ↩︎
    * [.title([*value*])](#Axis.title) ↩︎
    * [.titleConfig([*value*])](#Axis.titleConfig) ↩︎
    * [.width([*value*])](#Axis.width) ↩︎

<a name="new_Axis_new" href="new_Axis_new">#</a> new **Axis**()

Creates an SVG scale based on an array of data.


This is a constructor.

<a name="Axis.render" href="Axis.render">#</a> Axis.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L132)

Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Axis.align" href="Axis.align">#</a> Axis.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L451)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="Axis.barConfig" href="Axis.barConfig">#</a> Axis.**barConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L461)

If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.domain" href="Axis.domain">#</a> Axis.**domain**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L471)

If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Array</code> | <code>[0, 10]</code> | 

<a name="Axis.duration" href="Axis.duration">#</a> Axis.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L481)

If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>600</code> | 

<a name="Axis.grid" href="Axis.grid">#</a> Axis.**grid**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L491)

If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.gridConfig" href="Axis.gridConfig">#</a> Axis.**gridConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L501)

If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.gridSize" href="Axis.gridSize">#</a> Axis.**gridSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L511)

If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> | 

<a name="Axis.height" href="Axis.height">#</a> Axis.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L521)

If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="Axis.labels" href="Axis.labels">#</a> Axis.**labels**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L531)

If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.orient" href="Axis.orient">#</a> Axis.**orient**([*orient*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L541)

If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;bottom&quot;</code> | Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations. |

<a name="Axis.outerBounds" href="Axis.outerBounds">#</a> Axis.**outerBounds**() [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L568)

If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.


This is a static method of <code>[Axis](#Axis)</code>.


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="Axis.padding" href="Axis.padding">#</a> Axis.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L578)

If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="Axis.paddingInner" href="Axis.paddingInner">#</a> Axis.**paddingInner**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L588)

If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.1</code> | 

<a name="Axis.paddingOuter" href="Axis.paddingOuter">#</a> Axis.**paddingOuter**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L598)

If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.1</code> | 

<a name="Axis.range" href="Axis.range">#</a> Axis.**range**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L608)

If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.scale" href="Axis.scale">#</a> Axis.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L618)

If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="Axis.select" href="Axis.select">#</a> Axis.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L628)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> \| <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Axis.shape" href="Axis.shape">#</a> Axis.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L638)

If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;Line&quot;</code> | 

<a name="Axis.shapeConfig" href="Axis.shapeConfig">#</a> Axis.**shapeConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L648)

If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.tickFormat" href="Axis.tickFormat">#</a> Axis.**tickFormat**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L658)

If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Axis.ticks" href="Axis.ticks">#</a> Axis.**ticks**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L668)

If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.tickSize" href="Axis.tickSize">#</a> Axis.**tickSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L678)

If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="Axis.title" href="Axis.title">#</a> Axis.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L688)

If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>String</code> | 

<a name="Axis.titleConfig" href="Axis.titleConfig">#</a> Axis.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L698)

If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.width" href="Axis.width">#</a> Axis.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L708)

If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of <code>[Axis](#Axis)</code>, and is chainable with other methods of this Class.


| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 

---

<a name="AxisBottom"></a>
#### **AxisBottom** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisBottom.js#L3)


This is a global class. It extends all of the methods and functionality of <code>[Axis](#Axis)</code>.

<a name="new_AxisBottom_new" href="new_AxisBottom_new">#</a> new **AxisBottom**()

Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.


This is a constructor.

---

<a name="AxisLeft"></a>
#### **AxisLeft** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisLeft.js#L3)


This is a global class. It extends all of the methods and functionality of <code>[Axis](#Axis)</code>.

<a name="new_AxisLeft_new" href="new_AxisLeft_new">#</a> new **AxisLeft**()

Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.


This is a constructor.

---

<a name="AxisRight"></a>
#### **AxisRight** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisRight.js#L3)


This is a global class. It extends all of the methods and functionality of <code>[Axis](#Axis)</code>.

<a name="new_AxisRight_new" href="new_AxisRight_new">#</a> new **AxisRight**()

Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.


This is a constructor.

---

<a name="AxisTop"></a>
#### **AxisTop** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisTop.js#L3)


This is a global class. It extends all of the methods and functionality of <code>[Axis](#Axis)</code>.

<a name="new_AxisTop_new" href="new_AxisTop_new">#</a> new **AxisTop**()

Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.


This is a constructor.

---

<a name="date"></a>
#### d3plus.**date**(*date*) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/date.js#L1)

Parses numbers and strings to valid Javascript Date obejcts.


This is a global function.


| Param | Type |
| --- | --- |
| *date* | <code>Date</code> \| <code>Number</code> \| <code>String</code> | 

---

###### <sub>Documentation generated on Tue, 18 Apr 2017 20:27:52 GMT</sub>
