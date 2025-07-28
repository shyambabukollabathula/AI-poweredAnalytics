"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { UserChart } from "@/components/charts/user-chart";
import { ConversionChart } from "@/components/charts/conversion-chart";
import { DataTable } from "@/components/dashboard/data-table";
import { 
  MetricCardSkeleton, 
  ChartSkeleton, 
  TableSkeleton 
} from "@/components/dashboard/loading-skeleton";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useResponsive } from "@/hooks/use-responsive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { 
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Target,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data, metrics, isLoading, isRefreshing, lastUpdated, refresh } = useDashboardData();
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar className="hidden lg:flex" />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Welcome back! Here&apos;s what&apos;s happening with your campaigns today.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {!isMobile && (
                <Badge variant="outline" className="text-xs">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isMobile ? "" : "Refresh"}
              </Button>
              {!isMobile && (
                <DateRangePicker 
                  onDateRangeChange={(range) => {
                    console.log("Date range changed:", range);
                    // In a real app, this would filter the data
                  }}
                />
              )}
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                {isMobile ? "" : "Export Report"}
              </Button>
            </div>
          </motion.div>

          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <MetricCardSkeleton key={i} />
              ))
            ) : (
              metrics.map((metric, index) => (
                <MetricCard key={metric.id} metric={metric} index={index} />
              ))
            )}
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              {isLoading ? (
                <ChartSkeleton />
              ) : (
                <RevenueChart data={data.revenueData} />
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {isLoading ? (
              <>
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            ) : (
              <>
                <UserChart data={data.userData} />
                <ConversionChart data={data.conversionData} />
              </>
            )}
          </div>

          {/* Data Table */}
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable data={data.tableData} />
          )}

          {/* Quick Stats Footer */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium">Avg. CTR</p>
                        <p className="text-lg md:text-2xl font-bold">5.2%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium">Avg. CPC</p>
                        <p className="text-lg md:text-2xl font-bold">$1.24</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium">Conversion Rate</p>
                        <p className="text-lg md:text-2xl font-bold">3.8%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium">Avg. ROAS</p>
                        <p className="text-lg md:text-2xl font-bold">4.2x</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
