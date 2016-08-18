[width]: 600
[height]: 200

# Getting Started

d3plus-axis extrapolates on the ideas presented in [d3-axis](https://github.com/d3/d3-axis), most notably by adding grid lines and fitting the axis within the allotted space. To create an axis in an SVG group defined like this:

```html
<svg width=600 height=200>
  <g id="my-axis"></g>
</svg>
```

Here is the javascript needed:

```js
var bottom = new d3plus.AxisBottom()
  .select("#my-axis")
  .domain([3.14, 9.34])
  .height(200)
  .width(600)
  .render();
```

These axes are the brains behind [d3plus-plot](https://github.com/d3plus/d3plus-plot).
