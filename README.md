# d3plus-axis

[![NPM Release](http://img.shields.io/npm/v/d3plus-axis.svg?style=flat)](https://www.npmjs.org/package/d3plus-axis)
[![Build Status](https://travis-ci.org/d3plus/d3plus-axis.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-axis)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-axis.svg?style=flat)](https://david-dm.org/d3plus/d3plus-axis)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

Beautiful javascript scales and axes.

## Installing

If you use NPM, `npm install d3plus-axis`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-axis/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

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

 * [Tick Label Formatting](http://d3plus.org/examples/d3plus-axis/tickFormat/)
 * [Changing Axis Orientation](http://d3plus.org/examples/d3plus-axis/axis-orient/)
 * [Axis w/ Time Scale](http://d3plus.org/examples/d3plus-axis/scale-time/)
 * [Only Showing Specific Tick Labels](http://d3plus.org/examples/d3plus-axis/labels/)
 * [Setting Custom Ticks](http://d3plus.org/examples/d3plus-axis/ticks/)

## API Reference
### Classes

<dl>
<dt><a href="#Axis">Axis</a> ⇐ <code>BaseClass</code></dt>
<dd></dd>
<dt><a href="#AxisBottom">AxisBottom</a> ⇐ <code><a href="#Axis">Axis</a></code></dt>
<dd></dd>
<dt><a href="#AxisLeft">AxisLeft</a> ⇐ <code><a href="#Axis">Axis</a></code></dt>
<dd></dd>
<dt><a href="#AxisRight">AxisRight</a> ⇐ <code><a href="#Axis">Axis</a></code></dt>
<dd></dd>
<dt><a href="#AxisTop">AxisTop</a> ⇐ <code><a href="#Axis">Axis</a></code></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#date">date(*date*)</a></dt>
<dd><p>Parses numbers and strings to valid Javascript Date obejcts.</p>
</dd>
</dl>

<a name="Axis"></a>

### Axis ⇐ <code>BaseClass</code>
**Kind**: global class  
**Extends:** <code>BaseClass</code>  

* [Axis](#Axis) ⇐ <code>BaseClass</code>
    * [new Axis()](#new_Axis_new)
    * [.align([*value*])](#Axis.align)
    * [.barConfig([*value*])](#Axis.barConfig)
    * [.domain([*value*])](#Axis.domain)
    * [.duration([*value*])](#Axis.duration)
    * [.grid([*value*])](#Axis.grid)
    * [.gridConfig([*value*])](#Axis.gridConfig)
    * [.gridSize([*value*])](#Axis.gridSize)
    * [.height([*value*])](#Axis.height)
    * [.labels([*value*])](#Axis.labels)
    * [.orient([*orient*])](#Axis.orient)
    * [.outerBounds()](#Axis.outerBounds)
    * [.padding([*value*])](#Axis.padding)
    * [.paddingInner([*value*])](#Axis.paddingInner)
    * [.paddingOuter([*value*])](#Axis.paddingOuter)
    * [.range([*value*])](#Axis.range)
    * [.render([*callback*])](#Axis.render)
    * [.scale([*value*])](#Axis.scale)
    * [.select([*selector*])](#Axis.select)
    * [.shape([*value*])](#Axis.shape)
    * [.shapeConfig([*value*])](#Axis.shapeConfig)
    * [.tickFormat([*value*])](#Axis.tickFormat)
    * [.ticks([*value*])](#Axis.ticks)
    * [.tickSize([*value*])](#Axis.tickSize)
    * [.title([*value*])](#Axis.title)
    * [.titleConfig([*value*])](#Axis.titleConfig)
    * [.width([*value*])](#Axis.width)

<a name="new_Axis_new"></a>

#### new Axis()
Creates an SVG scale based on an array of data.

<a name="Axis.align"></a>

#### Axis.align([*value*])
If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="Axis.barConfig"></a>

#### Axis.barConfig([*value*])
If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.domain"></a>

#### Axis.domain([*value*])
If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Array</code> | <code>[0, 10]</code> | 

<a name="Axis.duration"></a>

#### Axis.duration([*value*])
If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>600</code> | 

<a name="Axis.grid"></a>

#### Axis.grid([*value*])
If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.gridConfig"></a>

#### Axis.gridConfig([*value*])
If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.gridSize"></a>

#### Axis.gridSize([*value*])
If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> | 

<a name="Axis.height"></a>

#### Axis.height([*value*])
If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="Axis.labels"></a>

#### Axis.labels([*value*])
If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.orient"></a>

#### Axis.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;bottom&quot;</code> | Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations. |

<a name="Axis.outerBounds"></a>

#### Axis.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.

**Kind**: static method of <code>[Axis](#Axis)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="Axis.padding"></a>

#### Axis.padding([*value*])
If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="Axis.paddingInner"></a>

#### Axis.paddingInner([*value*])
If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.1</code> | 

<a name="Axis.paddingOuter"></a>

#### Axis.paddingOuter([*value*])
If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.1</code> | 

<a name="Axis.range"></a>

#### Axis.range([*value*])
If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.render"></a>

#### Axis.render([*callback*])
Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Axis.scale"></a>

#### Axis.scale([*value*])
If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="Axis.select"></a>

#### Axis.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Axis.shape"></a>

#### Axis.shape([*value*])
If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;Line&quot;</code> | 

<a name="Axis.shapeConfig"></a>

#### Axis.shapeConfig([*value*])
If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.tickFormat"></a>

#### Axis.tickFormat([*value*])
If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Axis.ticks"></a>

#### Axis.ticks([*value*])
If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Axis.tickSize"></a>

#### Axis.tickSize([*value*])
If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="Axis.title"></a>

#### Axis.title([*value*])
If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>String</code> | 

<a name="Axis.titleConfig"></a>

#### Axis.titleConfig([*value*])
If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Axis.width"></a>

#### Axis.width([*value*])
If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[Axis](#Axis)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 

<a name="AxisBottom"></a>

### AxisBottom ⇐ <code>[Axis](#Axis)</code>
**Kind**: global class  
**Extends:** <code>[Axis](#Axis)</code>  
<a name="new_AxisBottom_new"></a>

#### new AxisBottom()
Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.

<a name="AxisLeft"></a>

### AxisLeft ⇐ <code>[Axis](#Axis)</code>
**Kind**: global class  
**Extends:** <code>[Axis](#Axis)</code>  
<a name="new_AxisLeft_new"></a>

#### new AxisLeft()
Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.

<a name="AxisRight"></a>

### AxisRight ⇐ <code>[Axis](#Axis)</code>
**Kind**: global class  
**Extends:** <code>[Axis](#Axis)</code>  
<a name="new_AxisRight_new"></a>

#### new AxisRight()
Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.

<a name="AxisTop"></a>

### AxisTop ⇐ <code>[Axis](#Axis)</code>
**Kind**: global class  
**Extends:** <code>[Axis](#Axis)</code>  
<a name="new_AxisTop_new"></a>

#### new AxisTop()
Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.

<a name="date"></a>

### date(*date*)
Parses numbers and strings to valid Javascript Date obejcts.

**Kind**: global function  

| Param | Type |
| --- | --- |
| *date* | <code>Date</code> &#124; <code>Number</code> &#124; <code>String</code> | 



###### <sub>Documentation generated on Mon, 05 Dec 2016 02:49:30 GMT</sub>
