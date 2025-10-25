/**
 * Validates date range where both start and end dates are required
 * and start date must be less than or equal to end date
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @returns {Object} - Validation result with isValid boolean and error message if invalid
 */
export const validateDateRange = (startDate, endDate) => {
  // Check if both dates are provided
  if (!startDate || !endDate) {
    return {
      isValid: false,
      error: 'Both start date and end date are required'
    };
  }

  // Convert to Date objects if they're strings
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if dates are valid
  if (isNaN(start.getTime())) {
    return {
      isValid: false,
      error: 'Invalid start date format'
    };
  }

  if (isNaN(end.getTime())) {
    return {
      isValid: false,
      error: 'Invalid end date format'
    };
  }

  // Check if start date is less than or equal to end date
  // allow equality (start === end)
  if (start > end) {
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

