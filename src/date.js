/**
    @function date
    @summary Parses numbers and strings to valid Javascript Date objects.
    @description Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.
    @param {Number|String} *date*
*/
export default function(d) {

  // returns if already Date object
  if (d.constructor === Date) return d;
  // detects if milliseconds
  else if (d.constructor === Number && `${d}`.length > 5 && d % 1 === 0) return new Date(d);

  let s = `${d}`;
  const dayFormat = new RegExp(/^\d{1,2}[./-]\d{1,2}[./-](-*\d{1,4})$/g).exec(s),
        strFormat = new RegExp(/^[A-z]{1,3} [A-z]{1,3} \d{1,2} (-*\d{1,4}) \d{1,2}:\d{1,2}:\d{1,2} [A-z]{1,3}-*\d{1,4} \([A-z]{1,3}\)/g).exec(s);

  // tests for XX/XX/XXXX format
  if (dayFormat) {
    const year = dayFormat[1];
    if (year.indexOf("-") === 0) s = s.replace(year, year.substr(1));
    const date = new Date(s);
    date.setFullYear(year);
    return date;
  }
  // tests for full Date object string format
  else if (strFormat) {
    const year = strFormat[1];
    if (year.indexOf("-") === 0) s = s.replace(year, year.substr(1));
    const date = new Date(s);
    date.setFullYear(year);
    return date;
  }
  // detects if only passing a year value
  else if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
    const date = new Date(`${s}/01/01`);
    date.setFullYear(d);
    return date;
  }
  // parses string to Date object
  else return new Date(s);

}
