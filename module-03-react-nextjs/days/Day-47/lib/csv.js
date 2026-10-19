function quote(value) {
  let text = String(value ?? "");

  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function toCsv(rows, columns) {
  const header = columns.map((column) => quote(column.label)).join(",");
  const lines = rows.map((row) =>
    columns.map((column) => quote(column.value(row))).join(",")
  );

  return [header, ...lines].join("\r\n");
}

export function downloadCsv(filename, csvText) {
  const blob = new Blob(["\uFEFF" + csvText], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}