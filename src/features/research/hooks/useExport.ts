import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Type augmentation for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

interface ExportConfig {
  filename: string;
  title: string;
  headers: string[];
}

export function useExport() {
  const exportCSV = <T,>(data: T[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = (
    data: (string | number | boolean)[][],
    config: ExportConfig
  ) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(config.title, 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Records: ${data.length}`, 14, 36);

    doc.autoTable({
      startY: 45,
      head: [config.headers],
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

    doc.save(`${config.filename}_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return {
    exportCSV,
    exportPDF
  };
}
