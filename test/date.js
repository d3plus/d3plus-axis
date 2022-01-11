import {test} from "zora";
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

  assert.equal(date("6/12/1987").getFullYear(),   1987, "AD: shorthand date w/ slashes");
  assert.equal(date("6/12/-1987").getFullYear(), -1987, "BC: shorthand date w/ slashes");
  assert.equal(date("6.12.1987").getFullYear(),   1987, "AD: shorthand date w/ dots");
  assert.equal(date("6.12.-1987").getFullYear(), -1987, "BC: shorthand date w/ dots");
  assert.equal(date("6-12-1987").getFullYear(),   1987, "AD: shorthand date w/ hyphens");
  assert.equal(date("6-12--1987").getFullYear(), -1987, "BC: shorthand date w/ hyphens");

  assert.equal(date("Mon Jan 01 100 00:00:00 GMT-0500 (EST)").getFullYear(),   100, "AD: datestring");
  assert.equal(date("Mon Jan 01 -100 00:00:00 GMT-0500 (EST)").getFullYear(), -100, "BC: datestring");

  assert.equal(date("Q21987").getTime(), date("06/30/1987").getTime(), "Quarter: uppercase prefix");
  assert.equal(date("Q2 1987").getTime(), date("06/30/1987").getTime(), "Quarter: uppercase prefix w/ space");
  assert.equal(date("q21987").getTime(), date("06/30/1987").getTime(), "Quarter: lowercase prefix");
  assert.equal(date("q2 1987").getTime(), date("06/30/1987").getTime(), "Quarter: lowercase prefix w/ space");

  assert.equal(date("1987Q2").getTime(), date("06/30/1987").getTime(), "Quarter: uppercase suffix");
  assert.equal(date("1987 Q2").getTime(), date("06/30/1987").getTime(), "Quarter: uppercase suffix w/ space");
  assert.equal(date("1987q2").getTime(), date("06/30/1987").getTime(), "Quarter: lowercase suffix");
  assert.equal(date("1987 q2").getTime(), date("06/30/1987").getTime(), "Quarter: lowercase suffix w/ space");

});

export default test;
