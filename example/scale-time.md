[width]: 600
[height]: 300

# Axis w/ Time Scale

All of the scales made available by [d3-scale](https://github.com/d3/d3-scale) are usable for an [Axis](http://d3plus.org/docs/#Axis) by passing the name of the scale, in all lowercase, to the [.scale( )](http://d3plus.org/docs/#Axis.scale) method:

```js
var bottom = new d3plus.AxisBottom()
  .domain([2002, 2004])
  .scale("time")
  .width(600)
  .height(300)
  .render();
```

In the case of time scales, all values provided will be mapped to Javascript Date objects. In addition to the [standard supported Javascript date strings](http://dygraphs.com/date-formats.html), the d3plus [date](http://d3plus.org/docs/#date) function is used so that 4-digit numeric years can also be parsed correctly.
