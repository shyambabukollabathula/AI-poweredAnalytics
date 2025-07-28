// Types for our analytics dashboard

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  description?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  [key: string]: any;
}

export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
  growth: number;
}

export interface UserData {
  date: string;
  users: number;
  newUsers: number;
  returningUsers: number;
}

export interface ConversionData {
  source: string;
  conversions: number;
  rate: number;
  color: string;
}

export interface TableData {
  id: string;
  campaign: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cost: number;
  roas: number;
  status: 'active' | 'paused' | 'completed';
}

export interface DashboardData {
  metrics: MetricCard[];
  revenueData: RevenueData[];
  userData: UserData[];
  conversionData: ConversionData[];
  tableData: TableData[];
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface FilterOptions {
  dateRange: DateRange;
  campaign?: string;
  source?: string;
}