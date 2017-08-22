[width]: 600
[height]: 300

# Creating an Axis

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
