
export function etb(amount) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

export function when(date) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export function relative(date) {
  if (!date) return "Not available";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not available";

  const seconds = Math.round((parsed.getTime() - Date.now()) / 1000);
  const absoluteSeconds = Math.abs(seconds);

  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  const [unit, size] =
    units.find(([, size]) => absoluteSeconds >= size) || units[units.length - 1];

  return new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  }).format(Math.round(seconds / size), unit);
}
