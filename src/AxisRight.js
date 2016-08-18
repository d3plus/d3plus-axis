import {default as Axis} from "./Axis";

/**
    @class AxisRight
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
export default class AxisRight extends Axis {

  constructor() {
    super();
    this.orient("right");
  }

}
