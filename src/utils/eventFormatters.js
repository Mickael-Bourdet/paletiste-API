/**
 * Format a date to French format (e.g., '26 avril 2025').
 * @param {string|Date} date - The date to format.
 * @returns {string} The formatted date in French.
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format a time string to 'HH:MM' (removes seconds).
 * @param {string|null} time - The time string (e.g., '14:30:00').
 * @returns {string|null} The formatted time (e.g., '14:30') or null if input is null.
 */
export const formatTime = (time) => {
  if (!time) return null;
  return time.substring(0, 5).replace(":", "h"); // Keep only 'HH:MM'
};

/**
 * Format a phone number to '06 07 08 09 10' format for better readability.
 * @param {string|null} phone - The phone number string.
 * @returns {string|null} The formatted phone number or null if input is null.
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return null;

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Format as '06 07 08 09 10' (most readable)
  if (digits.length === 10) {
    return digits.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  }

  // If not 10 digits, return original
  return phone;
};

/**
 * Generate a slug from multiple components with "concours" prefix.
 * @param {string} category - The event category.
 * @param {string} organizer - The event organizer.
 * @param {Date|string} date - The event date to extract year.
 * @returns {string} The slugified string.
 */
export const slugifyWithComponents = (category, organizer, date) => {
  const year = new Date(date).getFullYear();

  // Combine components with "concours" prefix
  const combined = `concours ${category} ${organizer}`;

  let slug = combined
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanum by dash
    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing dashes

  // Add year to the slug
  slug = `${slug}-${year}`;
  return slug;
};

export const generateEventTitle = (categoryName, organizer, date) => {
  const year = new Date(date).getFullYear();
  const base = `Concours${categoryName ?? ""} ${organizer}`.trim();
  return `${base} ${year}`.trim();
};
