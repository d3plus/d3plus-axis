import {test} from "tape";
import {default as Axis} from "../src/Axis.js";

test("Axis", assert => {

  new Axis()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
