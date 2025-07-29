"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  Download,
  FileText,
  X,
  Activity,
  BarChart3,
  Calendar,
  Info,
  Eye,
} from "lucide-react";
import { TableData } from "@/lib/types";
import { exportToCSV, exportToPDF, exportWeeklySummaryPDF } from "@/lib/export";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";

// Utility functions
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);
};

interface DataTableProps {
  data: TableData[];
}

const columnHelper = createColumnHelper<TableData>();

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const columns = useMemo(
    () => [
      columnHelper.accessor("campaign", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            Campaign
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="font-medium cursor-pointer hover:text-primary transition-colors">
                {row.getValue("campaign")}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{row.getValue("campaign")}</h4>
                <p className="text-sm text-muted-foreground">
                  Campaign performance overview with detailed metrics and insights.
                </p>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Status: {row.original.status}</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      }),
      columnHelper.accessor("impressions", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            Impressions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger>
              <div className="text-right font-mono">
                {formatNumber(row.getValue("impressions"))}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total ad impressions served</p>
            </TooltipContent>
          </Tooltip>
        ),
      }),
      columnHelper.accessor("clicks", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            Clicks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono">
            {formatNumber(row.getValue("clicks"))}
          </div>
        ),
      }),
      columnHelper.accessor("ctr", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            CTR
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const ctr = row.getValue("ctr") as number;
          return (
            <div className={`text-right font-mono ${ctr > 2 ? 'text-green-600' : ctr > 1 ? 'text-yellow-600' : 'text-red-600'}`}>
              {ctr}%
            </div>
          );
        },
      }),
      columnHelper.accessor("conversions", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            Conversions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono">
            {formatNumber(row.getValue("conversions"))}
          </div>
        ),
      }),
      columnHelper.accessor("cost", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            Cost
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono">
            {formatCurrency(row.getValue("cost"))}
          </div>
        ),
      }),
      columnHelper.accessor("roas", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 transition-colors duration-200"
          >
            ROAS
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const roas = row.getValue("roas") as number;
          return (
            <div className={`text-right font-mono ${roas > 3 ? 'text-green-600' : roas > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
              {roas}x
            </div>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant={status === "active" ? "default" : "secondary"}
              className={`${
                status === "active" 
                  ? "bg-green-100 text-green-800 hover:bg-green-200" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } transition-colors duration-200`}
            >
              {status}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRow(row.original)}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Campaign Details: {row.original.campaign}</DialogTitle>
              </DialogHeader>
              {selectedRow && (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Impressions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{formatNumber(selectedRow.impressions)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Clicks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{formatNumber(selectedRow.clicks)}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">CTR</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{selectedRow.ctr}%</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Conversions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{formatNumber(selectedRow.conversions)}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="insights" className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Performance Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          This campaign is performing {selectedRow.roas > 3 ? "excellently" : selectedRow.roas > 2 ? "well" : "below expectations"} 
                          with a ROAS of {selectedRow.roas}x. 
                          {selectedRow.ctr > 2 ? " The click-through rate is above average." : " Consider optimizing ad creative to improve CTR."}
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="font-semibold mb-2 text-primary">Recommendations</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• {selectedRow.roas < 2 ? "Consider reducing budget or optimizing targeting" : "Increase budget to scale performance"}</li>
                          <li>• {selectedRow.ctr < 1.5 ? "Test new ad creatives to improve engagement" : "Current creatives are performing well"}</li>
                          <li>• Monitor conversion rate trends for optimization opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </DialogContent>
          </Dialog>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <TooltipProvider>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent">
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Campaign Performance
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Detailed analytics and insights for your advertising campaigns
                </p>
              </div>
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        exportToCSV(data, "campaign-data.csv");
                        toast.success("Data exported to CSV!");
                      }}
                      className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export data as CSV file</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        exportToPDF(data, "campaign-report.pdf");
                        toast.success("Report exported to PDF!");
                      }}
                      className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export detailed report as PDF</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        exportWeeklySummaryPDF(data, "weekly_summary_report.pdf");
                      }}
                      className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Weekly Summary
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export weekly summary report as PDF</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          </CardHeader>
          <CardContent className="p-0">
            <motion.div 
              className="p-6 border-b bg-gradient-to-r from-background to-muted/20"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search campaigns..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(String(event.target.value))}
                    className="pl-10 bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all duration-200"
                  />
                </div>
                <Select
                  value={table.getState().pagination.pageSize.toString()}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[180px] bg-background/50 border-muted-foreground/20">
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        Show {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-b border-muted/50">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="bg-muted/30 font-semibold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-muted/30 hover:bg-muted/50 transition-all duration-200 group"
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-4">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            <motion.div 
              className="flex items-center justify-between space-x-2 p-6 bg-gradient-to-r from-muted/20 to-background"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex hover:bg-primary/10"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>First page</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Previous page</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Next page</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex hover:bg-primary/10"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                      >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last page</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}