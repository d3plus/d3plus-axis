import assert from "assert";
import {default as Axis} from "../src/Axis.js";
import it from "./jsdom.js";

it("Axis", function *() {

  yield cb => new Axis().render(cb);
  assert.ok(true, "function success");

});
