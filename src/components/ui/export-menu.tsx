"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, Calendar } from "lucide-react"
import { exportToCSV, exportToPDF, exportWeeklySummaryPDF } from "@/lib/export"
import { TableData } from "@/lib/types"
import toast from "react-hot-toast"

interface ExportMenuProps {
  data: TableData[]
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function ExportMenu({ 
  data, 
  variant = "outline", 
  size = "sm", 
  className = "" 
}: ExportMenuProps) {
  const handleCSVExport = () => {
    const timestamp = new Date().toISOString().split('T')[0]
    exportToCSV(data, `campaign-data-${timestamp}.csv`)
    toast.success("CSV file downloaded successfully!")
  }

  const handlePDFExport = () => {
    const timestamp = new Date().toISOString().split('T')[0]
    exportToPDF(data, `campaign-report-${timestamp}.pdf`)
    toast.success("PDF report downloaded successfully!")
  }

  const handleWeeklyReport = () => {
    const timestamp = new Date().toISOString().split('T')[0]
    exportWeeklySummaryPDF(data, `weekly-summary-${timestamp}.pdf`)
    toast.success("Weekly summary downloaded successfully!")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleCSVExport} className="cursor-pointer">
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span>Export as CSV</span>
            <span className="text-xs text-muted-foreground">
              Raw data for analysis
            </span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handlePDFExport} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span>Campaign Report PDF</span>
            <span className="text-xs text-muted-foreground">
              Detailed formatted report
            </span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleWeeklyReport} className="cursor-pointer">
          <Calendar className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span>Weekly Summary PDF</span>
            <span className="text-xs text-muted-foreground">
              Executive summary report
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}