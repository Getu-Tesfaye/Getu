
export function toCsv(rows) {
  if (!rows.length) return "";

  const columns = Object.keys(rows[0]);

  const escapeCell = (value) => {
    const text = value == null ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  return [
    columns.map(escapeCell).join(","),
    ...rows.map((row) =>
      columns.map((column) => escapeCell(row[column])).join(",")
    ),
  ].join("\r\n");
}

export function downloadCsv(filename, rows) {
  if (!rows.length) {
    alert("There is no booking history to export.");
    return;
  }

  const csv = "\uFEFF" + toCsv(rows);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
