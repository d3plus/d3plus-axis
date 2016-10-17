[width]: 600
[height]: 300

# Tick Label Formatting

The default label format can be overridden by passing a function to the [.tickFormat( )](https://github.com/d3plus/d3plus-axis#Axis.tickFormat) method. The function is passed the numeric value of each label (which in the case of dates is the number of milliseconds since midnight on January 1, 1970).

```js
var dateRange = ["06/30/2015", "08/31/2016"];

var bottom = new d3plus.AxisBottom()
  .domain(dateRange)
  .labels(dateRange)
  .ticks(dateRange)
  .tickFormat(function(ms) {
    return new Date(ms).getFullYear();
  })
  .scale("time")
  .width(600)
  .height(300)
  .render();
```
