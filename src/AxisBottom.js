import {default as Axis} from "./Axis";

/**
    @class AxisBottom
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
export default class AxisBottom extends Axis {

  constructor() {
    super();
    this.orient("bottom");
  }

}
