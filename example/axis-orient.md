[width]: 600
[height]: 300

# Changing Axis Orientation

Axes can be to constructed in 4 different orientations: top, right, bottom, or left. Shorthand classes are available, as in the [getting started example](http://d3plus.org/examples/d3plus-axis/getting-started/), but the main [Axis](http://d3plus.org/docs/#Axis) class can also be used in conjunction with the [.orient( )](http://d3plus.org/docs/#Axis.orient) method to manually set the orientation:

```js
var axis = new d3plus.Axis()
  .orient("left")
  .width(600)
  .height(300)
  .render();
```
