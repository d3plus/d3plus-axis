[width]: 600
[height]: 300

# Only Showing Specific Tick Labels

Sometimes it's necessary to only show the labels for specific ticks. By passing an array of values to the [.labels( )](https://github.com/d3plus/d3plus-axis#Axis.labels) method, it's possible to specify which tick labels are visible on the axis:

```js
var bottom = new d3plus.AxisBottom()
  .domain([1, 10])
  .labels([1, 3, 5, 7, 8, 9, 10])
  .width(600)
  .height(300)
  .render();
```
