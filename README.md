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

## Creating an Axis

The [d3plus-axis](https://github.com/d3plus/d3plus-axis) module expands on the ideas presented in [d3-axis](https://github.com/d3/d3-axis), most notably by adding grid lines and fitting the axis within the allotted space. To create a bottom aligned axis in an SVG group defined like this:

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

All four orientations available as shorthand methods for the generalized [Axis](http://d3plus.org/docs/#Axis) class that they all extend. These axis classes are used to create the x/y plot in [d3plus-plot](https://github.com/d3plus/d3plus-plot) visualizations.


[<kbd><img src="/example/getting-started.png" width="600px" /></kbd>](https://d3plus.org/examples/d3plus-axis/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-axis/getting-started/) to view this example live on the web.


### More Examples

 * [Changing Axis Orientation](http://d3plus.org/examples/d3plus-axis/axis-orient/)<sup> ***New***</sup>
 * [Hiding Specific Axis Labels](http://d3plus.org/examples/d3plus-axis/labels/)<sup> ***New***</sup>
 * [Axis w/ Time Scale](http://d3plus.org/examples/d3plus-axis/scale-time/)<sup> ***New***</sup>
 * [Custom Axis Tick Formatting](http://d3plus.org/examples/d3plus-axis/tickFormat/)<sup> ***New***</sup>
 * [Hiding Specific Axis Ticks](http://d3plus.org/examples/d3plus-axis/ticks/)<sup> ***New***</sup>

## API Reference

##### Classes
* [Axis](#Axis)
* [AxisBottom](#AxisBottom)
* [AxisLeft](#AxisLeft)
* [AxisRight](#AxisRight)
* [AxisTop](#AxisTop)

##### Functions
* [date](#date) - Parses numbers and strings to valid Javascript Date objects.

---

<a name="Axis"></a>
#### **Axis** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L17)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Axis](#Axis) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
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


<a name="new_Axis_new" href="#new_Axis_new">#</a> new **Axis**()

Creates an SVG scale based on an array of data.





<a name="Axis.render" href="#Axis.render">#</a> Axis.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L136)

Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.align" href="#Axis.align">#</a> Axis.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L486)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.barConfig" href="#Axis.barConfig">#</a> Axis.**barConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L496)

If *value* is specified, sets the axis line style and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.domain" href="#Axis.domain">#</a> Axis.**domain**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L506)

If *value* is specified, sets the scale domain of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.duration" href="#Axis.duration">#</a> Axis.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L516)

If *value* is specified, sets the transition duration of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.grid" href="#Axis.grid">#</a> Axis.**grid**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L526)

If *value* is specified, sets the grid values of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.gridConfig" href="#Axis.gridConfig">#</a> Axis.**gridConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L536)

If *value* is specified, sets the grid style of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.gridSize" href="#Axis.gridSize">#</a> Axis.**gridSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L546)

If *value* is specified, sets the grid size of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.height" href="#Axis.height">#</a> Axis.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L556)

If *value* is specified, sets the overall height of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.labels" href="#Axis.labels">#</a> Axis.**labels**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L566)

If *value* is specified, sets the visible tick labels of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.orient" href="#Axis.orient">#</a> Axis.**orient**([*orient*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L576)

If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.outerBounds" href="#Axis.outerBounds">#</a> Axis.**outerBounds**() [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L603)

If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.


This is a static method of [<code>Axis</code>](#Axis).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="Axis.padding" href="#Axis.padding">#</a> Axis.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L613)

If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.paddingInner" href="#Axis.paddingInner">#</a> Axis.**paddingInner**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L623)

If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.paddingOuter" href="#Axis.paddingOuter">#</a> Axis.**paddingOuter**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L633)

If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.range" href="#Axis.range">#</a> Axis.**range**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L643)

If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.scale" href="#Axis.scale">#</a> Axis.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L653)

If *value* is specified, sets the scale of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.select" href="#Axis.select">#</a> Axis.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L663)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.shape" href="#Axis.shape">#</a> Axis.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L673)

If *value* is specified, sets the tick shape constructor and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.shapeConfig" href="#Axis.shapeConfig">#</a> Axis.**shapeConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L683)

If *value* is specified, sets the tick style of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.tickFormat" href="#Axis.tickFormat">#</a> Axis.**tickFormat**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L693)

If *value* is specified, sets the tick formatter and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.ticks" href="#Axis.ticks">#</a> Axis.**ticks**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L703)

If *value* is specified, sets the tick values of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.tickSize" href="#Axis.tickSize">#</a> Axis.**tickSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L713)

If *value* is specified, sets the tick size of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.title" href="#Axis.title">#</a> Axis.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L723)

If *value* is specified, sets the title of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.titleConfig" href="#Axis.titleConfig">#</a> Axis.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L733)

If *value* is specified, sets the title configuration of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.


<a name="Axis.width" href="#Axis.width">#</a> Axis.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L743)

If *value* is specified, sets the overall width of the axis and returns the current class instance.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.

---

<a name="AxisBottom"></a>
#### **AxisBottom** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisBottom.js#L3)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](#Axis).


<a name="new_AxisBottom_new" href="#new_AxisBottom_new">#</a> new **AxisBottom**()

Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.




---

<a name="AxisLeft"></a>
#### **AxisLeft** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisLeft.js#L3)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](#Axis).


<a name="new_AxisLeft_new" href="#new_AxisLeft_new">#</a> new **AxisLeft**()

Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.




---

<a name="AxisRight"></a>
#### **AxisRight** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisRight.js#L3)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](#Axis).


<a name="new_AxisRight_new" href="#new_AxisRight_new">#</a> new **AxisRight**()

Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.




---

<a name="AxisTop"></a>
#### **AxisTop** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/AxisTop.js#L3)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](#Axis).


<a name="new_AxisTop_new" href="#new_AxisTop_new">#</a> new **AxisTop**()

Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.




---

<a name="date"></a>
#### d3plus.**date**(*date*) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/date.js#L1)

Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.


This is a global function.

---



###### <sub>Documentation generated on Tue, 22 Aug 2017 03:50:43 GMT</sub>
