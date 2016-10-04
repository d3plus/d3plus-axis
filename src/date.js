/**
    @function date
    @desc Parses numbers and strings to valid Javascript Date obejcts.
    @param {Date|Number|String} *date*
*/
export default function(d) {

  // returns if already Date object
  if (d.constructor === Date) return d;
  // detects if milliseconds
  else if (d.constructor === Number && d > 0 && `${d}`.length > 4 && d % 1 === 0) return new Date(d);

  const s = `${d}`;
  // detects if only passing a year value
  if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
    const date = new Date(`${s}/01/01`);
    date.setFullYear(d);
    return date;
  }
  // parses string to Date object
  else return new Date(s);

}
