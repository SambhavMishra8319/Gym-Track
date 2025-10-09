// csvUtils.js
import Papa from "papaparse";

/**
 * Parse a File or a CSV string into array of objects (header row -> keys).
 * Usage:
 *   const rows = await parseCSVFile(fileInput.files[0])
 */
export function parseCSVFile(fileOrString) {
  return new Promise((resolve, reject) => {
    if (fileOrString instanceof File) {
      Papa.parse(fileOrString, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      });
    } else {
      // assume string
      const results = Papa.parse(fileOrString, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
      });
      if (results.errors && results.errors.length) reject(results.errors);
      else resolve(results.data);
    }
  });
}

/**
 * Export array of objects to downloadable CSV.
 * data: [{col1: 'a', col2: 'b'}, ...]
 */
export function exportCSV(data, filename = "export.csv") {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
