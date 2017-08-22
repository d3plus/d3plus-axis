[width]: 600
[height]: 300

# Hiding Specific Axis Ticks

It is occasionally necessary to only show tick marks for specific ticks on an [Axis](http://d3plus.org/docs/#Axis). By passing an array of values to the [.ticks( )](http://d3plus.org/docs/#Axis.ticks) method, it's possible to specify which ticks are visible on the axis:

```js
var bottom = new d3plus.AxisBottom()
  .domain([0, 10])
  .ticks([1, 3, 5, 7, 8, 9, 10])
  .width(600)
  .height(300)
  .render();
```

Notice that while the ticks/gridlines have been modified, the labels still appear at default intervals. This behavior can be overridden using the [.labels( )](http://d3plus.org/docs/#Axis.labels) method, as seen in [this example](http://d3plus.org/examples/d3plus-axis/labels/).
