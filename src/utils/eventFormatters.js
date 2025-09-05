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
export const formatPhoneNumber = (reservations) => {
  if (!Array.isArray(reservations)) return reservations;

  return reservations.map((field) => {
    if (field.type === "phone" && typeof field.value === "string") {
      // Remove all non-digit characters
      const digits = field.value.replace(/\D/g, "");

      // Format as '06 07 08 09 10' (most readable)
      let formattedPhone;
      if (digits.length === 10) {
        formattedPhone = digits.replace(
          /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
          "$1 $2 $3 $4 $5"
        );
      } else {
        formattedPhone = field.value; // if no 10 digits, keep original
      }
      return { ...field, value: formattedPhone };
    } else {
      return field; //email, url, info or unexpected type
    }
  });
};

/**
 * Generate a slug from multiple components with "concours" prefix.
 * @param {string} category - The event category.
 * @param {string} organizer - The event organizer.
 * @param {Date|string} date - The event date to extract year.
 * @returns {string} The slugified string.
 */
export const slugifyWithComponents = (
  eventType,
  category,
  organizer,
  dateFormatted
) => {
  const year = new Date(dateFormatted).getFullYear();

  // Detect special tags
  let prefix = "concours";

  if (eventType.includes("coupe_de_france")) {
    prefix = "coupe-de-france";
  } else if (eventType.includes("open")) {
    prefix = "open";
  } else if (eventType.includes("femme")) {
    prefix = "open-feminin";
  } else if (eventType.includes("seniors")) {
    prefix = "tournoi-seniors";
  } else if (eventType.includes("jeunes")) {
    prefix = "coupe-vendee-jeunes";
  }
  // Combine components with appropriate prefix
  const combined = `${prefix} ${category} ${organizer}`;

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

export const generateEventTitle = (
  eventType,
  categoryName,
  organizer,
  dateFormatted
) => {
  const year = new Date(dateFormatted).getFullYear();
  let typeOfEvent = "Concours";
  if (eventType.includes("coupe_de_france")) {
    typeOfEvent = "Coupe de France";
  } else if (eventType.includes("open")) {
    typeOfEvent = "Open";
  } else if (eventType.includes("femme")) {
    typeOfEvent = "Open Féminin";
  } else if (eventType.includes("seniors")) {
    typeOfEvent = "Tournoi Seniors";
  } else if (eventType.includes("jeunes")) {
    typeOfEvent = "Coupe de Vendée Jeunes";
  }
  const base = `${typeOfEvent} ${categoryName ?? ""} ${organizer}`.trim();
  return `${base} ${year}`.trim();
};

export const generateEventTags = (event) => {
  const tags = [...event.tags];

  if (event.postalCode)
    tags.unshift({ name: event.postalCode.substring(0, 2) });
  if (event.teamType) tags.unshift({ name: event.teamType });
  if (event.organizerType) tags.unshift({ name: event.organizerType });
  if (event.eventType !== "concours") tags.unshift({ name: event.eventType });
  return tags;
};
export const formatEvent = (event) => {
  return {
    ...event.toJSON(),
    // Create a title if empty string
    title:
      event.title ??
      generateEventTitle(
        event.eventType,
        event.category?.name,
        event.organizer,
        event.date
      ),
    // create slug
    slug: slugifyWithComponents(
      event.eventType,
      event.category?.name ?? "", // Category name or empty string
      event.organizer, // Event organizer
      event.date // Event date
    ),
    tags: generateEventTags(event),
    date: event.date, // ISO
    dateFormatted: formatDate(event.date), // Format date in French
    registration_time: formatTime(event.registration_time), // Format registration time
    start_time: formatTime(event.start_time), // Format start time
    reservation: formatPhoneNumber(event.reservation), // Format phone number
  };
};
