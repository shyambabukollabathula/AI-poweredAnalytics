import { TableData } from "./types";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

export function exportToCSV(data: TableData[], filename: string = "campaign-data.csv") {
  try {
    const headers = [
      "Campaign",
      "Impressions", 
      "Clicks",
      "CTR (%)",
      "Conversions",
      "Cost ($)",
      "ROAS",
      "Status"
    ];

    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        `"${row.campaign}"`,
        row.impressions,
        row.clicks,
        row.ctr,
        row.conversions,
        row.cost,
        row.roas,
        `"${row.status}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`CSV exported successfully! (${data.length} campaigns)`);
    }
  } catch (error) {
    toast.error('Failed to export CSV file');
    console.error('CSV export error:', error);
  }
}

export function exportToPDF(data: TableData[], filename: string = "campaign-report.pdf") {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('ADmyBRAND Insights - Campaign Report', 14, 22);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 32);
    
    // Add summary statistics
    const summary = generateReportSummary(data);
    doc.setFontSize(12);
    doc.text('Summary Statistics:', 14, 45);
    doc.setFontSize(10);
    doc.text(`Total Campaigns: ${summary.totalCampaigns}`, 14, 55);
    doc.text(`Active Campaigns: ${summary.activeCampaigns}`, 14, 62);
    doc.text(`Total Impressions: ${summary.totalImpressions}`, 14, 69);
    doc.text(`Total Clicks: ${summary.totalClicks}`, 14, 76);
    doc.text(`Total Conversions: ${summary.totalConversions}`, 14, 83);
    doc.text(`Total Cost: ${summary.totalCost}`, 14, 90);
    doc.text(`Average CTR: ${summary.avgCTR}`, 14, 97);
    doc.text(`Average ROAS: ${summary.avgROAS}`, 14, 104);

    // Add table
    const tableData = data.map(row => [
      row.campaign,
      row.impressions.toLocaleString(),
      row.clicks.toLocaleString(),
      `${row.ctr}%`,
      row.conversions.toLocaleString(),
      `$${row.cost.toLocaleString()}`,
      `${row.roas}x`,
      row.status
    ]);

    autoTable(doc, {
      head: [['Campaign', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Cost', 'ROAS', 'Status']],
      body: tableData,
      startY: 115,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252], // Light gray
      },
      columnStyles: {
        0: { cellWidth: 35 }, // Campaign
        1: { cellWidth: 20 }, // Impressions
        2: { cellWidth: 15 }, // Clicks
        3: { cellWidth: 15 }, // CTR
        4: { cellWidth: 20 }, // Conversions
        5: { cellWidth: 20 }, // Cost
        6: { cellWidth: 15 }, // ROAS
        7: { cellWidth: 20 }, // Status
      },
    });

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount} | ADmyBRAND Insights Dashboard`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF
    doc.save(filename);
    
    toast.success(`PDF report generated successfully! (${data.length} campaigns)`);
  } catch (error) {
    toast.error('Failed to generate PDF report');
    console.error('PDF export error:', error);
  }
}

export function generateReportSummary(data: TableData[]) {
  const totalImpressions = data.reduce((sum, row) => sum + row.impressions, 0);
  const totalClicks = data.reduce((sum, row) => sum + row.clicks, 0);
  const totalConversions = data.reduce((sum, row) => sum + row.conversions, 0);
  const totalCost = data.reduce((sum, row) => sum + row.cost, 0);
  const avgCTR = data.reduce((sum, row) => sum + row.ctr, 0) / data.length;
  const avgROAS = data.reduce((sum, row) => sum + row.roas, 0) / data.length;

  return {
    totalCampaigns: data.length,
    totalImpressions: totalImpressions.toLocaleString(),
    totalClicks: totalClicks.toLocaleString(),
    totalConversions: totalConversions.toLocaleString(),
    totalCost: `$${totalCost.toLocaleString()}`,
    avgCTR: `${avgCTR.toFixed(2)}%`,
    avgROAS: `${avgROAS.toFixed(2)}x`,
    activeCampaigns: data.filter(row => row.status === "active").length,
    pausedCampaigns: data.filter(row => row.status === "paused").length,
  };
}