import dns from "dns";
import { promisify } from "util";
import disposableEmails from "disposable-email-domains" with { type: "json" };

// Promisify the dns.resolveMx function to use it with async/await
const resolveMx = promisify(dns.resolveMx);

/**
 * Check if an email is from a disposable domain.
 *
 * @param {string} email - The email address to check.
 * @returns {boolean} - True if the email is from a disposable domain, false otherwise.
 */
export const isDisposableEmail = (email) => {
  // Extract the domain from the email address and convert it to lowercase
  const domain = email.split("@")[1].toLowerCase();
  // Check if the domain is in the list of disposable email domains
  return disposableEmails.includes(domain);
};

/**
 * Check if the domain of an email address has valid MX records.
 *
 * @param {string} email - The email address to check.
 * @returns {Promise<boolean>} - True if the domain has valid MX records, false otherwise.
 */
export const isDomainValid = async (email) => {
  try {
    // Extract the domain from the email address and convert it to lowercase
    const domain = email.split("@")[1].toLowerCase();
    // Resolve the MX records (mail server) for the domain
    const mxRecords = await resolveMx(domain);
    // Return true if MX records are found, false otherwise
    return mxRecords && mxRecords.length > 0;
  } catch {
    // Return false if an error occurs (e.g., domain does not exist)
    return false;
  }
};
