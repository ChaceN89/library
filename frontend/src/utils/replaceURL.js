/**
 * Replaces spaces in a string with dashes for URL usage.
 * Converts the string to lowercase to ensure consistency.
 *
 * @param {string} text - The string to transform.
 * @returns {string} - The transformed string with dashes replacing spaces.
 */
export const formatURL = (text) => {
  if (!text) return ""; // Handle null or undefined text
  return text.toLowerCase().replace(/\s+/g, "-");
};
