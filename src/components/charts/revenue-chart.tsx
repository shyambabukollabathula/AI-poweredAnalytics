"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { RevenueData } from "@/lib/types";
import { motion } from "framer-motion";
import { MoreHorizontal, Download, Maximize2 } from "lucide-react";
import toast from 'react-hot-toast';
import { useState } from "react";

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [chartType, setChartType] = useState<'area' | 'line'>('area');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleExportChart = () => {
    toast.success('Chart exported successfully!', {
      icon: '📊',
      duration: 2000,
    });
  };

  const handleFullscreen = () => {
    toast('Opening chart in fullscreen mode...', {
      icon: '🔍',
      duration: 2000,
    });
  };

  const toggleChartType = () => {
    const newType = chartType === 'area' ? 'line' : 'area';
    setChartType(newType);
    toast.success(`Switched to ${newType} chart view`, {
      icon: '📈',
      duration: 1500,
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-blue-500">Revenue: </span>
              {formatCurrency(payload[0].value)}
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Target: </span>
              {formatCurrency(payload[1].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                Revenue Overview
                <Badge variant="outline" className="ml-2">
                  {chartType === 'area' ? 'Area' : 'Line'} Chart
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly revenue performance vs targets
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleChartType}
              >
                {chartType === 'area' ? 'Line View' : 'Area View'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleExportChart}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm mt-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gray-400" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </AreaChart>
              ) : (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#9ca3af', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}