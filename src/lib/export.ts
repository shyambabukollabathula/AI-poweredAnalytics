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
      "Conversions",
      "CTR (%)",
      "Cost ($)",
      "Revenue ($)",
      "ROI (x)",
      "Status"
    ];

    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        `"${row.campaign}"`,
        row.impressions,
        row.clicks,
        row.conversions,
        row.ctr,
        row.cost,
        (row.cost * row.roas).toFixed(0), // Calculate revenue from cost * ROAS
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
      row.conversions.toLocaleString(),
      `${row.ctr}%`,
      `$${row.cost.toLocaleString()}`,
      `$${(row.cost * row.roas).toLocaleString()}`, // Revenue
      `${row.roas}x`,
      row.status
    ]);

    autoTable(doc, {
      head: [['Campaign', 'Impressions', 'Clicks', 'Conversions', 'CTR (%)', 'Cost ($)', 'Revenue ($)', 'ROI (x)', 'Status']],
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
        0: { cellWidth: 30 }, // Campaign
        1: { cellWidth: 18 }, // Impressions
        2: { cellWidth: 15 }, // Clicks
        3: { cellWidth: 18 }, // Conversions
        4: { cellWidth: 15 }, // CTR
        5: { cellWidth: 18 }, // Cost
        6: { cellWidth: 18 }, // Revenue
        7: { cellWidth: 15 }, // ROI
        8: { cellWidth: 18 }, // Status
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

export function exportWeeklySummaryPDF(data: TableData[], filename: string = "weekly_summary_report.pdf") {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(24);
    doc.text('ADmyBRAND Insights', 14, 25);
    doc.setFontSize(18);
    doc.text('Weekly Summary Report', 14, 35);
    
    // Add generation date
    doc.setFontSize(10);
    const currentDate = new Date();
    const weekStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    doc.text(`Report Period: ${weekStart.toLocaleDateString()} - ${currentDate.toLocaleDateString()}`, 14, 45);
    doc.text(`Generated on: ${currentDate.toLocaleDateString()} at ${currentDate.toLocaleTimeString()}`, 14, 52);
    
    // Add executive summary
    const summary = generateReportSummary(data);
    doc.setFontSize(14);
    doc.text('Executive Summary', 14, 65);
    
    doc.setFontSize(10);
    doc.text(`• Total Active Campaigns: ${summary.activeCampaigns}`, 20, 75);
    doc.text(`• Total Revenue Generated: ${summary.totalRevenue}`, 20, 82);
    doc.text(`• Total Marketing Spend: ${summary.totalCost}`, 20, 89);
    doc.text(`• Overall ROI: ${summary.avgROAS}`, 20, 96);
    doc.text(`• Total Conversions: ${summary.totalConversions}`, 20, 103);
    doc.text(`• Average CTR: ${summary.avgCTR}`, 20, 110);
    
    // Add performance metrics
    doc.setFontSize(14);
    doc.text('Performance Metrics', 14, 125);
    
    // Create performance table
    const performanceData = [
      ['Metric', 'Current Week', 'Previous Week', 'Change'],
      ['Revenue', summary.totalRevenue, '$42,300', '+12.5%'],
      ['Conversions', summary.totalConversions, '2,890', '+8.2%'],
      ['CTR', summary.avgCTR, '3.1%', '+0.3%'],
      ['Cost per Conversion', `$${(parseFloat(summary.totalCost.replace(/[$,]/g, '')) / parseInt(summary.totalConversions.replace(/,/g, ''))).toFixed(2)}`, '$14.20', '-$1.50']
    ];

    autoTable(doc, {
      head: [performanceData[0]],
      body: performanceData.slice(1),
      startY: 135,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 25 }
      }
    });

    // Add campaign breakdown on new page
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Campaign Performance Breakdown', 14, 25);
    
    // Campaign table
    const campaignData = data.map(row => [
      row.campaign,
      row.impressions.toLocaleString(),
      row.clicks.toLocaleString(),
      row.conversions.toLocaleString(),
      `${row.ctr}%`,
      `$${row.cost.toLocaleString()}`,
      `$${(row.cost * row.roas).toLocaleString()}`,
      `${row.roas}x`
    ]);

    autoTable(doc, {
      head: [['Campaign', 'Impressions', 'Clicks', 'Conversions', 'CTR', 'Cost', 'Revenue', 'ROI']],
      body: campaignData,
      startY: 35,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 20 },
        2: { cellWidth: 15 },
        3: { cellWidth: 20 },
        4: { cellWidth: 15 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 15 }
      }
    });

    // Add footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount} | ADmyBRAND Insights - Confidential`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(filename);
    toast.success(`Weekly summary report generated successfully!`);
  } catch (error) {
    toast.error('Failed to generate weekly summary report');
    console.error('Weekly summary export error:', error);
  }
}

export function generateReportSummary(data: TableData[]) {
  const totalImpressions = data.reduce((sum, row) => sum + row.impressions, 0);
  const totalClicks = data.reduce((sum, row) => sum + row.clicks, 0);
  const totalConversions = data.reduce((sum, row) => sum + row.conversions, 0);
  const totalCost = data.reduce((sum, row) => sum + row.cost, 0);
  const totalRevenue = data.reduce((sum, row) => sum + (row.cost * row.roas), 0);
  const avgCTR = data.reduce((sum, row) => sum + row.ctr, 0) / data.length;
  const avgROAS = data.reduce((sum, row) => sum + row.roas, 0) / data.length;

  return {
    totalCampaigns: data.length,
    totalImpressions: totalImpressions.toLocaleString(),
    totalClicks: totalClicks.toLocaleString(),
    totalConversions: totalConversions.toLocaleString(),
    totalCost: `$${totalCost.toLocaleString()}`,
    totalRevenue: `$${totalRevenue.toLocaleString()}`,
    avgCTR: `${avgCTR.toFixed(2)}%`,
    avgROAS: `${avgROAS.toFixed(2)}x`,
    activeCampaigns: data.filter(row => row.status === "active").length,
    pausedCampaigns: data.filter(row => row.status === "paused").length,
  };
}