"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { UserChart } from "@/components/charts/user-chart";
import { ConversionChart } from "@/components/charts/conversion-chart";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Eye,
  Settings,
} from "lucide-react";
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const { data, isLoading, refresh } = useDashboardData();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    toast.success(`Analytics updated for ${timeframes.find(t => t.value === timeframe)?.label}`, {
      icon: '📊',
      duration: 2000,
    });
  };

  const handleExportAnalytics = () => {
    toast.success('Analytics report exported successfully!', {
      icon: '📄',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        currentPage="analytics"
      />
      
      <div className="flex">
        <Sidebar 
          className="hidden lg:flex" 
          currentPage="analytics"
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
          >
            <div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Advanced Analytics</h1>
                <Badge variant="secondary">Pro</Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Deep dive into your campaign performance and user behavior
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.value}
                    variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeframeChange(timeframe.value)}
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={refresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportAnalytics}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Analytics Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124,563</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-2.1%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goal Completions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,429</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15.3%</span> from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Section */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RevenueChart data={data.revenueData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <UserChart data={data.userData} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-6 grid-cols-1 lg:grid-cols-3"
          >
            <div className="lg:col-span-1">
              <ConversionChart data={data.conversionData} />
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    Analytics Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                      📈 Performance Trend
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Your campaigns are performing 23% better than the industry average this month.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">
                      🎯 Optimization Opportunity
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Mobile traffic shows 34% higher conversion rates. Consider increasing mobile ad spend.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                      ⚠️ Attention Required
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      Desktop bounce rate increased by 5.2%. Review landing page performance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}