import {test} from "tape";
import {default as date} from "../src/date.js";

test("date", assert => {

  assert.equal(date(1234).getFullYear(),   1234, "AD: 4-digit year");
  assert.equal(date(123).getFullYear(),     123, "AD: 3-digit year");
  assert.equal(date(12).getFullYear(),       12, "AD: 2-digit year");
  assert.equal(date(1).getFullYear(),         1, "AD: 1-digit year");
  assert.equal(date(0).getFullYear(),         0, "0");
  assert.equal(date(-1).getFullYear(),       -1, "BC: 1-digit year");
  assert.equal(date(-12).getFullYear(),     -12, "BC: 2-digit year");
  assert.equal(date(-123).getFullYear(),   -123, "BC: 3-digit year");
  assert.equal(date(-1234).getFullYear(), -1234, "BC: 4-digit year");
  assert.end();

});
