"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  TrendingUp,
  Filter,
  Download,
} from "lucide-react";
import toast from 'react-hot-toast';

interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  growth: number;
  engagement: number;
  color: string;
}

interface DemographicData {
  category: string;
  segments: { name: string; value: number; percentage: number }[];
}

const audienceSegments: AudienceSegment[] = [
  { id: '1', name: 'New Visitors', size: 45230, growth: 12.5, engagement: 68, color: 'bg-blue-500' },
  { id: '2', name: 'Returning Users', size: 32150, growth: 8.2, engagement: 84, color: 'bg-green-500' },
  { id: '3', name: 'High-Value Customers', size: 8940, growth: 15.7, engagement: 92, color: 'bg-purple-500' },
  { id: '4', name: 'Mobile Users', size: 67890, growth: 22.1, engagement: 76, color: 'bg-orange-500' },
];

const demographicData: DemographicData[] = [
  {
    category: 'Age Groups',
    segments: [
      { name: '18-24', value: 18500, percentage: 23 },
      { name: '25-34', value: 32400, percentage: 41 },
      { name: '35-44', value: 19200, percentage: 24 },
      { name: '45-54', value: 7200, percentage: 9 },
      { name: '55+', value: 2400, percentage: 3 },
    ],
  },
  {
    category: 'Devices',
    segments: [
      { name: 'Mobile', value: 52000, percentage: 65 },
      { name: 'Desktop', value: 20800, percentage: 26 },
      { name: 'Tablet', value: 7200, percentage: 9 },
    ],
  },
  {
    category: 'Top Locations',
    segments: [
      { name: 'United States', value: 35200, percentage: 44 },
      { name: 'United Kingdom', value: 12800, percentage: 16 },
      { name: 'Canada', value: 9600, percentage: 12 },
      { name: 'Australia', value: 6400, percentage: 8 },
      { name: 'Germany', value: 4800, percentage: 6 },
    ],
  },
];

export default function AudiencePage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const handleExportAudience = () => {
    toast.success('Audience data exported successfully!', {
      icon: '📊',
      duration: 2000,
    });
  };

  const handleCreateSegment = () => {
    toast.success('Opening audience segment builder...', {
      icon: '🎯',
      duration: 2000,
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        currentPage="audience"
      />
      
      <div className="flex">
        <Sidebar 
          className="hidden lg:flex" 
          currentPage="audience"
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
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Audience Insights</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Understand your audience demographics and behavior patterns
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
              <Button variant="outline" size="sm" onClick={handleCreateSegment}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportAudience}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Audience Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124,563</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,230</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18.2%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.7%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.2%</span> from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Audience Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Audience Segments</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Key audience segments and their performance metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {audienceSegments.map((segment, index) => (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${segment.color}`} />
                        <div>
                          <h3 className="font-semibold">{segment.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {segment.size.toLocaleString()} users
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Growth</p>
                          <p className="font-semibold text-green-600">
                            +{segment.growth}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Engagement</p>
                          <p className="font-semibold">{segment.engagement}%</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast(`Analyzing ${segment.name} segment...`, { icon: '🔍' })}
                        >
                          Analyze
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demographics */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {demographicData.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {category.category === 'Devices' && <Smartphone className="h-5 w-5" />}
                      {category.category === 'Top Locations' && <MapPin className="h-5 w-5" />}
                      {category.category === 'Age Groups' && <Users className="h-5 w-5" />}
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.segments.map((segment, index) => (
                        <div key={segment.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {category.category === 'Devices' && getDeviceIcon(segment.name)}
                              <span className="text-sm font-medium">{segment.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">{segment.percentage}%</p>
                              <p className="text-xs text-muted-foreground">
                                {segment.value.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Progress value={segment.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Audience Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    📱 Mobile-First Audience
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    65% of your audience uses mobile devices. Consider optimizing for mobile experience.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    🎯 High-Value Segment Growth
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your high-value customer segment is growing 15.7% faster than average.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                    🌍 Geographic Opportunity
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    Strong performance in English-speaking markets. Consider expanding to similar regions.
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