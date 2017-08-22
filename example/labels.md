[width]: 600
[height]: 300

# Hiding Specific Axis Labels

It is occasionally necessary to only show labels for specific ticks on an [Axis](http://d3plus.org/docs/#Axis). By passing an array of values to the [.labels( )](http://d3plus.org/docs/#Axis.labels) method, it's possible to specify which tick labels are visible:

```js
var bottom = new d3plus.AxisBottom()
  .domain([0, 10])
  .labels([0, 1, 3, 5, 7, 8, 9, 10])
  .width(600)
  .height(300)
  .render();
```

Notice that while the labels have been modified, the ticks/gridlines still appear at default intervals. This behavior can be overridden using the [.ticks( )](http://d3plus.org/docs/#Axis.ticks) method, as seen in [this example](http://d3plus.org/examples/d3plus-axis/ticks/).
