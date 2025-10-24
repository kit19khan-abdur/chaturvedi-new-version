/**
 * Validates date range where both start and end dates are required
 * and start date must be less than or equal to end date
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @returns {Object} - Validation result with isValid boolean and error message if invalid
 */
export const validateDateRange = (startDate, endDate, options = {}) => {
  // Check if both dates are provided
  if (!startDate || !endDate) {
    return {
      isValid: false,
      error: 'Both start date and end date are required'
    };
  }

  // Use the robust parser to accept many formats (but keep original return shape)
  const startParsed = parseDate(startDate, options);
  const endParsed = parseDate(endDate, options);

  if (!startParsed) {
    return {
      isValid: false,
      error: 'Invalid start date format'
    };
  }

  if (!endParsed) {
    return {
      isValid: false,
      error: 'Invalid end date format'
    };
  }

  // Compare date-only values (ignore time component). Allow equality.
  const startDay = new Date(startParsed.getFullYear(), startParsed.getMonth(), startParsed.getDate()).getTime();
  const endDay = new Date(endParsed.getFullYear(), endParsed.getMonth(), endParsed.getDate()).getTime();

  if (startDay > endDay) {
    return {
      isValid: false,
      error: 'Start date must be less than or equal to end date'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Parse a wide range of date inputs into a Date object (or null if invalid).
 * Accepts Date, timestamp number, ISO strings, `YYYYMMDD`, `DD-MM-YYYY`, `DD/MM/YYYY`,
 * `MM-DD-YYYY`, `MM/DD/YYYY`, `DD Mon YYYY`, `Mon DD, YYYY`, and many more that
 * the built-in Date parser supports. For ambiguous numeric forms like `01-02-2024`
 * this function prefers day-first (DD-MM-YYYY) unless the day part is > 12.
 *
 * Returns a Date instance (with original time component if provided) or null.
 */
/**
 * Parse a date input into a Date object.
 * @param {string|Date|number} input
 * @param {Object} [options]
 * @param {boolean} [options.dayFirst=true] - When parsing ambiguous numeric dates like `01-02-2024`,
 * if true interprets as DD-MM-YYYY, otherwise MM-DD-YYYY.
 * @returns {Date|null}
 */
function parseDate(input, options = {}) {
  const { dayFirst = true } = options;
  if (input === undefined || input === null || input === "") return null;

  // Date object
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input;
  }

  // Numeric timestamp
  if (typeof input === "number") {
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }

  // String handling
  if (typeof input === "string") {
    let s = input.trim();
    if (!s) return null;

    // Quick native parse first (handles many formats and month names)
    const n = new Date(s);
    if (!isNaN(n.getTime())) return n;

    // Normalize separators and remove ordinal suffixes / commas
    s = s.replace(/(st|nd|rd|th)/gi, "");
    s = s.replace(/,/g, "");
    s = s.replace(/[\.\s\/]+/g, "-");

    // YYYY-MM-DD or YYYY-M-D
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) {
      const [y, m, d] = s.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return isNaN(date.getTime()) ? null : date;
    }

    // YYYYMMDD
    if (/^\d{8}$/.test(s)) {
      const y = Number(s.slice(0, 4));
      const m = Number(s.slice(4, 6));
      const d = Number(s.slice(6, 8));
      const date = new Date(y, m - 1, d);
      return isNaN(date.getTime()) ? null : date;
    }

    // D-M-YYYY or M-D-YYYY (ambiguous): handle according to dayFirst option
    if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(s)) {
      const [a, b, y] = s.split("-").map(Number);
      // if one part > 12 it's definitely the day
      let day, month;
      if (a > 12) {
        day = a;
        month = b;
      } else if (b > 12) {
        day = b;
        month = a;
      } else {
        // ambiguous: follow dayFirst option
        if (dayFirst) {
          day = a;
          month = b;
        } else {
          day = b;
          month = a;
        }
      }
      const date = new Date(y, month - 1, day);
      return isNaN(date.getTime()) ? null : date;
    }

    // Fallback: let Date try again with slight modifications (replace - with /)
    const alt = new Date(s.replace(/-/g, "/"));
    if (!isNaN(alt.getTime())) return alt;
  }

  return null;
};

/**
 * Validate date range using more robust parsing (handles many common formats).
 */
export const validateDateRangeRobust = (startDate, endDate, options = {}) => {
  if (!startDate || !endDate) {
    return { isValid: false, error: "Both start date and end date are required" };
  }

  const startParsed = parseDate(startDate, options);
  const endParsed = parseDate(endDate, options);

  if (!startParsed) return { isValid: false, error: "Invalid start date format" };
  if (!endParsed) return { isValid: false, error: "Invalid end date format" };

  // Normalize to date-only (strip time) for fair comparison
  const startDay = new Date(startParsed.getFullYear(), startParsed.getMonth(), startParsed.getDate()).getTime();
  const endDay = new Date(endParsed.getFullYear(), endParsed.getMonth(), endParsed.getDate()).getTime();

  if (startDay > endDay) {
    return { isValid: false, error: "Start date must be less than or equal to end date" };
  }

  return { isValid: true, error: null };
};

/**
 * Strict validator that throws Error when validation fails.
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @returns {boolean} - Returns true when validation passes
 * @throws {Error} - Throws an Error with a helpful message when validation fails
 */
export const validateDateRangeStrict = (startDate, endDate) => {
  const result = validateDateRange(startDate, endDate);
  if (!result.isValid) {
    throw new Error(result.error);
  }
  return true;
};

