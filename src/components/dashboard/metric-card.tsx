"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard as MetricCardType } from "@/lib/types";
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
};

export function MetricCard({ metric, index }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;

  const handleCardClick = () => {
    toast.success(`Viewing detailed ${metric.title} analytics`, {
      icon: '📊',
      duration: 2000,
    });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast(`Opening ${metric.title} breakdown...`, {
      icon: '🔍',
      duration: 2000,
    });
  };
  const isPositive = metric.changeType === "increase";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card 
        className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleViewDetails}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={isPositive ? "default" : "destructive"}
                className="flex items-center space-x-1"
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </Badge>
              {metric.description && (
                <span className="text-xs text-muted-foreground">
                  {metric.description}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
}