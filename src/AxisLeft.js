import {default as Axis} from "./Axis";

/**
    @class AxisLeft
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
export default class AxisLeft extends Axis {

  constructor() {
    super();
    this._height = 400;
    this.orient("left");
    this._width = 100;
  }

}
