import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  const exportPDF = (data: WCSRecord[], filename: string = 'wcs_prelims') => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('WCS Prelim Scoring Analysis', 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Records: ${data.length}`, 14, 36);

    const tableData = data.map(r => [
      r.event_date,
      r.competitor_name,
      r.event_title,
      r.Registry_Points_Sum.toFixed(1),
      r.Promoted ? 'YES' : 'NO'
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Date', 'Competitor', 'Event', 'Score', 'Promoted']],
      body: tableData,
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
