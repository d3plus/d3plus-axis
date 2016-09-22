[width]: 600
[height]: 300

# Changing Axis Orientation

Axes can be to constructed in 4 different orientations (top, right, bottom, or left). Shorthand classes are available, as in the [getting started example], but the main class can also be used in conjunction with the [.orient( )](https://github.com/d3plus/d3plus-axis#Axis.orient) method.

```js
var axis = new d3plus.Axis()
  .orient("left")
  .width(600)
  .height(300)
  .render();
```
