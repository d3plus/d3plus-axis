import zora from "zora";
import {default as Axis} from "../src/Axis.js";

export default zora()
  .test("Axis", function *(assert) {

    yield cb => new Axis().render(cb);
    assert.ok(true, "function success");

  });
