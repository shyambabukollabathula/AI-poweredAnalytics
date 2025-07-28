"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { UserData } from "@/lib/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Download, Maximize2, BarChart3, Users } from "lucide-react";
import toast from 'react-hot-toast';
import { useState } from "react";

interface UserChartProps {
  data: UserData[];
}

export function UserChart({ data }: UserChartProps) {
  const [showReturning, setShowReturning] = useState(true);
  const [showNew, setShowNew] = useState(true);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const handleExportChart = () => {
    toast.success('User analytics exported successfully!', {
      icon: '👥',
      duration: 2000,
    });
  };

  const handleFullscreen = () => {
    toast('Opening user analytics in fullscreen...', {
      icon: '🔍',
      duration: 2000,
    });
  };

  const toggleDataSeries = (series: 'new' | 'returning') => {
    if (series === 'new') {
      setShowNew(!showNew);
      toast(`${!showNew ? 'Showing' : 'Hiding'} new users data`, {
        icon: 'ℹ️',
        duration: 1500,
      });
    } else {
      setShowReturning(!showReturning);
      toast(`${!showReturning ? 'Showing' : 'Hiding'} returning users data`, {
        icon: 'ℹ️',
        duration: 1500,
      });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="font-medium">{format(date, "MMM dd, yyyy")}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm">
                <span style={{ color: entry.color }}>{entry.name}: </span>
                {formatNumber(entry.value)}
              </p>
            ))}
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
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                User Analytics
                <Badge variant="outline" className="ml-2">
                  Bar Chart
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Daily user engagement breakdown
              </p>
            </div>
            <div className="flex items-center space-x-2">
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
            <Button
              variant={showNew ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDataSeries('new')}
              className="h-8"
            >
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
              New Users
            </Button>
            <Button
              variant={showReturning ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDataSeries('returning')}
              className="h-8"
            >
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
              Returning Users
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                  tickFormatter={(value) => format(new Date(value), "MMM dd")}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {showNew && (
                  <Bar
                    dataKey="newUsers"
                    name="New Users"
                    fill="#3b82f6"
                    radius={[2, 2, 0, 0]}
                  />
                )}
                {showReturning && (
                  <Bar
                    dataKey="returningUsers"
                    name="Returning Users"
                    fill="#10b981"
                    radius={[2, 2, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}