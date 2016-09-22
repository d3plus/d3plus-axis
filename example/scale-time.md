[width]: 600
[height]: 300

# Axis w/ Time Scale

Any of the scales made available in [d3-scale](https://github.com/d3/d3-scale) are usable in [d3plus-axis](https://github.com/d3plus/d3plus-axis). By passing the name of the scale to the [.scale( )](https://github.com/d3plus/d3plus-axis#Axis.scale) method, it's possible to specify which scale should be used.

```js
var bottom = new d3plus.AxisBottom()
  .domain([2002, 2016])
  .scale("time")
  .width(600)
  .height(300)
  .render();
```

In the case of time scales, all values provided will be mapped to Javascript Date objects. In addition to the [standard supported strings](http://dygraphs.com/date-formats.html), 4-digit years can also be parsed.
