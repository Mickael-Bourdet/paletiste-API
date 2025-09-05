import { Op, fn, col, where as sqlWhere } from "sequelize";

export const stripAccents = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const MONTHS_FR = {
  janvier: 0,
  fevrier: 1,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  decembre: 11,
  décembre: 11,
};

const toStartOfDay = (d) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
};
const addDays = (d, days) => {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + days);
  return dt;
};
const startOfMonth = (year, monthIndex) =>
  new Date(year, monthIndex, 1, 0, 0, 0, 0);
const startOfNextMonth = (year, monthIndex) =>
  monthIndex === 11
    ? new Date(year + 1, 0, 1, 0, 0, 0, 0)
    : new Date(year, monthIndex + 1, 1, 0, 0, 0, 0);

const parseSpecificDate = (value) => {
  if (!value || typeof value !== "string") return null;
  const raw = value.trim();

  // Try ISO or Date.parse compatible
  const iso = new Date(raw);
  if (!Number.isNaN(iso.getTime())) return toStartOfDay(iso);

  // Try dd/mm/yyyy or dd-mm-yyyy
  const m1 = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (m1) {
    const day = Number(m1[1]);
    const month = Number(m1[2]) - 1;
    const year = Number(m1[3]);
    const d = new Date(year, month, day);
    if (!Number.isNaN(d.getTime())) return toStartOfDay(d);
  }

  // Try "13 septembre 2025" (French month)
  const norm = stripAccents(raw);
  const m2 = norm.match(/^(\d{1,2})\s+([a-zéèêôûîïçùà]+)\s+(\d{4})$/);
  if (m2) {
    const day = Number(m2[1]);
    const monthName = m2[2];
    const year = Number(m2[3]);
    const monthIndex = MONTHS_FR[monthName];
    if (monthIndex !== undefined) {
      const d = new Date(year, monthIndex, day);
      if (!Number.isNaN(d.getTime())) return toStartOfDay(d);
    }
  }

  return null;
};

const parseMonthYear = (value, yearHint) => {
  if (!value && !(value && yearHint)) return null;

  // If provided as combined like "janvier 2026"
  if (typeof value === "string" && value.includes(" ")) {
    const norm = stripAccents(value.trim());
    const parts = norm.split(/\s+/);
    if (parts.length === 2) {
      const monthIndex = MONTHS_FR[parts[0]];
      const year = Number(parts[1]);
      if (monthIndex !== undefined && Number.isInteger(year)) {
        return { year, monthIndex };
      }
    }
  }

  // If provided as numeric like "2026-01" or "01-2026"
  if (typeof value === "string" && /^(\d{4})-(\d{1,2})$/.test(value)) {
    const [, y, m] = value.match(/^(\d{4})-(\d{1,2})$/);
    const year = Number(y);
    const monthIndex = Number(m) - 1;
    if (monthIndex >= 0 && monthIndex <= 11) return { year, monthIndex };
  }
  if (typeof value === "string" && /^(\d{1,2})-(\d{4})$/.test(value)) {
    const [, m, y] = value.match(/^(\d{1,2})-(\d{4})$/);
    const year = Number(y);
    const monthIndex = Number(m) - 1;
    if (monthIndex >= 0 && monthIndex <= 11) return { year, monthIndex };
  }

  // As two separate params: month (French name or 1-12) + year
  if (value && yearHint) {
    const year = Number(yearHint);
    if (Number.isInteger(year)) {
      let monthIndex;
      if (typeof value === "string") {
        const norm = stripAccents(value.trim());
        if (/^\d{1,2}$/.test(norm)) {
          monthIndex = Number(norm) - 1;
        } else {
          monthIndex = MONTHS_FR[norm];
        }
      }
      if (monthIndex !== undefined && monthIndex >= 0 && monthIndex <= 11) {
        return { year, monthIndex };
      }
    }
  }

  return null;
};

export const queryBuilder = (filters) => {
  const where = {};

  // Filter by event type : concours, CDF, jeunes etc
  if (filters.eventType) {
    where.eventType = filters.eventType;
  }

  // Filter by organizer type
  if (filters.organizerType) {
    where.organizerType = filters.organizerType;
  }

  // Filter by department
  if (filters.department) {
    where.postalCode = { [Op.like]: `${filters.department}%` };
  }

  // Filter by specific date (accepts ISO, dd/mm/yyyy, dd-mm-yyyy, or '13 septembre 2025')
  if (filters.specificDate) {
    const d = parseSpecificDate(filters.specificDate);
    if (d) {
      where.date = { [Op.gte]: d, [Op.lt]: addDays(d, 1) };
    }
  }

  // Filter by month/year (accepts 'janvier 2026', '2026-01', '01-2026', or month+year)
  // Takes effect only if specificDate not provided (specific date is more precise)
  if (!where.date) {
    const monthYearInput = filters.monthYear || filters.month;
    const monthYear = parseMonthYear(monthYearInput, filters.year);
    if (monthYear) {
      const start = startOfMonth(monthYear.year, monthYear.monthIndex);
      const end = startOfNextMonth(monthYear.year, monthYear.monthIndex);
      where.date = { [Op.gte]: start, [Op.lt]: end };
    }
  }

  // Filter by team type
  if (filters.teamType) {
    where.teamType = filters.teamType;
  }

  // Accent-insensitive city filter using PostgreSQL unaccent (prefix match)
  if (filters.location) {
    const wanted = stripAccents(String(filters.location));
    where[Op.and] = where[Op.and] || [];
    where[Op.and].push(
      sqlWhere(fn("unaccent", col("city")), { [Op.iLike]: `%${wanted}%` })
    );
  }

  return where;
};
