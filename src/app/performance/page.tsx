"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { UserChart } from "@/components/charts/user-chart";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
} from "lucide-react";
import toast from 'react-hot-toast';

interface PerformanceMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  icon: React.ElementType;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    id: '1',
    name: 'Return on Ad Spend (ROAS)',
    value: '4.2x',
    change: 12.5,
    target: 4.0,
    status: 'excellent',
    icon: DollarSign,
  },
  {
    id: '2',
    name: 'Cost Per Acquisition (CPA)',
    value: '$24.50',
    change: -8.3,
    target: 25.0,
    status: 'good',
    icon: Target,
  },
  {
    id: '3',
    name: 'Click-Through Rate (CTR)',
    value: '5.2%',
    change: 15.7,
    target: 4.5,
    status: 'excellent',
    icon: MousePointer,
  },
  {
    id: '4',
    name: 'Conversion Rate',
    value: '3.8%',
    change: -2.1,
    target: 4.0,
    status: 'warning',
    icon: TrendingUp,
  },
  {
    id: '5',
    name: 'Cost Per Click (CPC)',
    value: '$1.24',
    change: 5.2,
    target: 1.20,
    status: 'warning',
    icon: MousePointer,
  },
  {
    id: '6',
    name: 'Impression Share',
    value: '78%',
    change: 3.4,
    target: 80.0,
    status: 'good',
    icon: Eye,
  },
];

interface CampaignPerformance {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

const campaignPerformance: CampaignPerformance[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    spend: 3250,
    revenue: 13650,
    roas: 4.2,
    conversions: 312,
    status: 'excellent',
  },
  {
    id: '2',
    name: 'Holiday Promotion',
    spend: 6800,
    revenue: 25840,
    roas: 3.8,
    conversions: 450,
    status: 'good',
  },
  {
    id: '3',
    name: 'Brand Awareness Q4',
    spend: 1200,
    revenue: 2520,
    roas: 2.1,
    conversions: 96,
    status: 'warning',
  },
];

export default function PerformancePage() {
  const { data, isLoading, refresh } = useDashboardData();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'good':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
      case 'poor':
        return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'poor':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleExportReport = () => {
    toast.success('Performance report exported successfully!', {
      icon: '📊',
      duration: 2000,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        currentPage="performance"
      />
      
      <div className="flex">
        <Sidebar 
          className="hidden lg:flex" 
          currentPage="performance"
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
                <TrendingUp className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Performance Dashboard</h1>
                <Badge variant="secondary">Real-time</Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Monitor and optimize your campaign performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.value}
                    variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe.value)}
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={refresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Performance Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  Overall Performance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-green-600">87/100</div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-600">+5 points</span> from last period
                    </p>
                  </div>
                  <div className="flex-1 max-w-md ml-8">
                    <Progress value={87} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Poor</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(metric.status)}
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          <span className={metric.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {metric.change >= 0 ? '+' : ''}{metric.change}%
                          </span> from last period
                        </p>
                        <Badge variant="outline" className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RevenueChart data={data.revenueData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <UserChart data={data.userData} />
            </motion.div>
          </div>

          {/* Campaign Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Top performing campaigns by ROAS and conversion volume
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignPerformance.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(campaign.status)}
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {campaign.conversions} conversions
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Spend</p>
                          <p className="font-semibold">{formatCurrency(campaign.spend)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="font-semibold">{formatCurrency(campaign.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ROAS</p>
                          <p className="font-semibold">{campaign.roas.toFixed(1)}x</p>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast(`Optimizing ${campaign.name}...`, { icon: '⚡' })}
                      >
                        Optimize
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Performance Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    🚀 Scale High-Performing Campaigns
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Summer Sale 2024 is exceeding ROAS targets. Consider increasing budget by 25%.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                    ⚠️ Optimize Conversion Rate
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Conversion rate is 2.1% below target. Review landing page experience and checkout flow.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    💡 Keyword Expansion Opportunity
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    CTR is 15.7% above average. Expand to similar high-performing keywords.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}