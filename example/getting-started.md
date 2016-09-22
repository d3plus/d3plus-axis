[width]: 600
[height]: 300

# Getting Started

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
  .domain([1, 10])
  .width(600)
  .height(300)
  .render();
```

The [d3plus-axis](https://github.com/d3plus/d3plus-axis) module makes all four orientations available as shorthand methods for the generalized [Axis](https://github.com/d3plus/d3plus-axis#Axis) class that they all extend. These axes are the brains behind [d3plus-plot](https://github.com/d3plus/d3plus-plot).
