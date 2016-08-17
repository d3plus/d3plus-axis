import {default as Axis} from "./Axis";

/**
    @class AxisTop
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
export default class AxisTop extends Axis {

  constructor() {
    super();
    this._height = 100;
    this.orient("top");
    this._width = 400;
  }

}
