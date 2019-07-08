import {test} from "zora";
import {default as Axis} from "../src/Axis.js";

test("Axis", function *(assert) {

  yield cb => new Axis().render(cb);
  assert.ok(true, "function success");

});

export default test;
