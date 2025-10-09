// csvUtils.js
export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;

  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(",") +
    "\n" +
    rows
      .map((row) =>
        keys.map((k) => `"${row[k] !== undefined ? row[k] : ""}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  link.click();
}

export function importFromCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
      const headers = headerLine.split(",");
      const rows = lines.map((line) => {
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => {
          obj[h.replace(/"/g, "")] = values[i]?.replace(/"/g, "") || "";
        });
        return obj;
      });
      resolve(rows);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}
