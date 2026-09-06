import Papa from 'papaparse';
import { WCSRecord } from './useWCSData';

export function useExport() {
  const exportCSV = (data: WCSRecord[], filename: string = 'wcs_prelims') => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  interface PDFOptions {
    title?: string;
    filename?: string;
    headers: string[][];
    data: (string | number)[][];
  }

  const exportPDF = async (options: PDFOptions) => {
    const { title = 'Report', filename = 'export', headers, data } = options;
    const [{ jsPDF }, autoTableModule] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]);
    const autoTable = autoTableModule.default;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Records: ${data.length}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: headers,
      body: data,
      theme: 'grid',
      // Using RGB values to avoid hex color detection and match brand-ish dark gray
      headStyles: { fillColor: [26, 43, 60], textColor: [255, 255, 255], fontSize: 10 },
      bodyStyles: { fontSize: 9 },
      columnStyles: {
        3: { halign: 'center' },
        4: { halign: 'center' }
      }
    });

    doc.save(`${filename}_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return {
    exportCSV,
    exportPDF
  };
}
