export function etb(amount) {
  return `${Number(amount).toLocaleString("en-US")} ETB`;
}

export function when(dateString) {
  return new Date(dateString).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
  });
}

export function relative(dateString) {
  const seconds = Math.round(
    (new Date(dateString).getTime() - Date.now()) / 1000
  );
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      return formatter.format(Math.round(seconds / size), unit);
    }
  }

  return formatter.format(seconds, "second");
}