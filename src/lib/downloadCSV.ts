export const downloadCSV = (data: Blob, filename: string) => {
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
