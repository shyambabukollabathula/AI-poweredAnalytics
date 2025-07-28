// Mock data for ADmyBRAND Insights Dashboard

import { DashboardData, MetricCard, RevenueData, UserData, ConversionData, TableData } from './types';

// Key Metrics Cards Data
export const metricsData: MetricCard[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$847,392',
    change: 12.5,
    changeType: 'increase',
    icon: 'DollarSign',
    description: 'vs last month'
  },
  {
    id: 'users',
    title: 'Active Users',
    value: '124,847',
    change: 8.2,
    changeType: 'increase',
    icon: 'Users',
    description: 'vs last month'
  },
  {
    id: 'conversions',
    title: 'Conversions',
    value: '3,247',
    change: -2.1,
    changeType: 'decrease',
    icon: 'Target',
    description: 'vs last month'
  },
  {
    id: 'growth',
    title: 'Growth Rate',
    value: '23.8%',
    change: 5.4,
    changeType: 'increase',
    icon: 'TrendingUp',
    description: 'vs last month'
  }
];

// Revenue Chart Data (Line Chart)
export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 65000, target: 60000, growth: 8.3 },
  { month: 'Feb', revenue: 72000, target: 65000, growth: 10.8 },
  { month: 'Mar', revenue: 68000, target: 70000, growth: -2.9 },
  { month: 'Apr', revenue: 78000, target: 75000, growth: 14.7 },
  { month: 'May', revenue: 85000, target: 80000, growth: 9.0 },
  { month: 'Jun', revenue: 92000, target: 85000, growth: 8.2 },
  { month: 'Jul', revenue: 88000, target: 90000, growth: -4.3 },
  { month: 'Aug', revenue: 95000, target: 92000, growth: 8.0 },
  { month: 'Sep', revenue: 102000, target: 98000, growth: 7.4 },
  { month: 'Oct', revenue: 108000, target: 105000, growth: 5.9 },
  { month: 'Nov', revenue: 115000, target: 110000, growth: 6.5 },
  { month: 'Dec', revenue: 125000, target: 120000, growth: 8.7 }
];

// User Analytics Data (Bar Chart)
export const userData: UserData[] = [
  { date: '2024-01-01', users: 12500, newUsers: 3200, returningUsers: 9300 },
  { date: '2024-01-02', users: 13200, newUsers: 3800, returningUsers: 9400 },
  { date: '2024-01-03', users: 11800, newUsers: 2900, returningUsers: 8900 },
  { date: '2024-01-04', users: 14500, newUsers: 4200, returningUsers: 10300 },
  { date: '2024-01-05', users: 15200, newUsers: 4800, returningUsers: 10400 },
  { date: '2024-01-06', users: 13800, newUsers: 3600, returningUsers: 10200 },
  { date: '2024-01-07', users: 16200, newUsers: 5100, returningUsers: 11100 }
];

// Conversion Sources Data (Pie Chart)
export const conversionData: ConversionData[] = [
  { source: 'Google Ads', conversions: 1247, rate: 38.4, color: '#3b82f6' },
  { source: 'Facebook Ads', conversions: 892, rate: 27.5, color: '#ef4444' },
  { source: 'Instagram', conversions: 634, rate: 19.5, color: '#f59e0b' },
  { source: 'LinkedIn', conversions: 298, rate: 9.2, color: '#10b981' },
  { source: 'Twitter', conversions: 176, rate: 5.4, color: '#8b5cf6' }
];

// Campaign Performance Table Data
export const tableData: TableData[] = [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    impressions: 245680,
    clicks: 12284,
    ctr: 5.0,
    conversions: 847,
    cost: 15420,
    roas: 4.2,
    status: 'active'
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q4',
    impressions: 189340,
    clicks: 8967,
    ctr: 4.7,
    conversions: 623,
    cost: 12890,
    roas: 3.8,
    status: 'active'
  },
  {
    id: '3',
    campaign: 'Holiday Special',
    impressions: 156720,
    clicks: 7834,
    ctr: 5.0,
    conversions: 512,
    cost: 9870,
    roas: 5.1,
    status: 'completed'
  },
  {
    id: '4',
    campaign: 'New Product Launch',
    impressions: 298450,
    clicks: 14923,
    ctr: 5.0,
    conversions: 1034,
    cost: 18760,
    roas: 4.7,
    status: 'active'
  },
  {
    id: '5',
    campaign: 'Retargeting Campaign',
    impressions: 87650,
    clicks: 5249,
    ctr: 6.0,
    conversions: 398,
    cost: 6540,
    roas: 3.2,
    status: 'paused'
  },
  {
    id: '6',
    campaign: 'Mobile App Promotion',
    impressions: 134890,
    clicks: 6745,
    ctr: 5.0,
    conversions: 445,
    cost: 8920,
    roas: 3.9,
    status: 'active'
  },
  {
    id: '7',
    campaign: 'Email Newsletter',
    impressions: 67890,
    clicks: 3395,
    ctr: 5.0,
    conversions: 234,
    cost: 4560,
    roas: 2.8,
    status: 'active'
  },
  {
    id: '8',
    campaign: 'Influencer Collaboration',
    impressions: 198760,
    clicks: 11926,
    ctr: 6.0,
    conversions: 789,
    cost: 14230,
    roas: 4.5,
    status: 'completed'
  }
];

// Combined dashboard data
export const dashboardData: DashboardData = {
  metrics: metricsData,
  revenueData,
  userData,
  conversionData,
  tableData
};

// Utility function to simulate real-time data updates
export const generateRealtimeMetrics = (): MetricCard[] => {
  return metricsData.map(metric => ({
    ...metric,
    value: typeof metric.value === 'string' 
      ? metric.value 
      : Math.floor(metric.value * (0.95 + Math.random() * 0.1)),
    change: Math.round((Math.random() * 20 - 10) * 100) / 100
  }));
};

// Function to get filtered data based on date range
export const getFilteredData = (startDate: Date, endDate: Date) => {
  // In a real app, this would filter based on actual dates
  // For demo purposes, we'll return the same data
  return dashboardData;
};