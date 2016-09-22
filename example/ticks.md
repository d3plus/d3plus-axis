[width]: 600
[height]: 300

# Setting Custom Ticks

Sometimes it's necessary to override the default behavior to show only specific ticks. By passing an array of values to the [.ticks( )](https://github.com/d3plus/d3plus-axis#Axis.ticks) method, it's possible to specify which ticks are visible on the axis:

```js
var bottom = new d3plus.AxisBottom()
  .domain([0, 10])
  .ticks([1, 3, 5, 7, 8, 9, 10])
  .width(600)
  .height(300)
  .render();
```
