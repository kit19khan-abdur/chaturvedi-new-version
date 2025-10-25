import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extend dayjs with the parsing plugin
dayjs.extend(customParseFormat);

/**
 * Validates date range where both start and end dates are required
 * and start date must be less than or equal to end date
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @param {Object} [options] - parsing options
 * @param {boolean} [options.dayFirst=false] - if true, parse ambiguous numeric dates as DD/MM/YYYY, otherwise MM/DD/YYYY
 * @returns {Object} - Validation result with isValid boolean and error message if invalid
 */
export const validateDateRange = (startDate, endDate, options = {}) => {
  // Check if both dates are provided
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Both start date and end date are required' };
  }

  const startParsed = parseDate(startDate, options);
  const endParsed = parseDate(endDate, options);

  if (!startParsed) return { isValid: false, error: 'Invalid start date format' };
  if (!endParsed) return { isValid: false, error: 'Invalid end date format' };

  // Compare date-only (strip time)
  const s = dayjs(startParsed).startOf('day');
  const e = dayjs(endParsed).startOf('day');

  if (s.isAfter(e)) return { isValid: false, error: 'Start date must be less than or equal to end date' };

  return { isValid: true, error: null };
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
  const { dayFirst = false } = options; // default month-first to match system
  if (input === undefined || input === null || input === "") return null;

  // If already a Date instance
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input;
  }

  // If numeric timestamp
  if (typeof input === 'number') {
    const d = dayjs(input);
    return d.isValid() ? d.toDate() : null;
  }

  // String parsing via dayjs with candidate formats
  if (typeof input === 'string') {
    const s = input.trim();
    if (!s) return null;

    // Try ISO / native parse first
    const iso = dayjs(s);
    if (iso.isValid()) return iso.toDate();

    // Candidate formats
    const isoLike = ['YYYY-MM-DD', 'YYYYMMDD'];
    const ddmmy = ['DD-MM-YYYY', 'DD/MM/YYYY', 'DD-MMM-YYYY', 'D-M-YYYY', 'D/M/YYYY'];
    const mmddy = ['MM-DD-YYYY', 'MM/DD/YYYY', 'M-D-YYYY', 'M/D/YYYY'];

    const formats = dayFirst ? [...ddmmy, ...isoLike, ...mmddy] : [...mmddy, ...isoLike, ...ddmmy];

    const parsed = dayjs(s, formats, true); // strict parse
    if (parsed.isValid()) return parsed.toDate();
  }

  return null;
}

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

