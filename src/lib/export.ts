import { TableData } from "./types";

export function exportToCSV(data: TableData[], filename: string = "campaign-data.csv") {
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
  }
}

export function exportToPDF(data: TableData[], filename: string = "campaign-report.pdf") {
  // For a real implementation, you would use a library like jsPDF
  // For now, we'll show a simple alert
  alert(`PDF export functionality would generate a report with ${data.length} campaigns. In a real implementation, this would use libraries like jsPDF or Puppeteer.`);
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