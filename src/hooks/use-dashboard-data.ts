"use client";

import { useState, useEffect, useCallback } from "react";
import { dashboardData, generateRealtimeMetrics } from "@/lib/data";
import { DashboardData, MetricCard } from "@/lib/types";

interface UseDashboardDataReturn {
  data: DashboardData;
  metrics: MetricCard[];
  isLoading: boolean;
  isRefreshing: boolean;
  lastUpdated: Date;
  refresh: () => Promise<void>;
}

export function useDashboardData(): UseDashboardDataReturn {
  const [data] = useState<DashboardData>(dashboardData);
  const [metrics, setMetrics] = useState<MetricCard[]>(dashboardData.metrics);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Real-time updates
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setMetrics(generateRealtimeMetrics());
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isLoading]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMetrics(generateRealtimeMetrics());
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, []);

  return {
    data,
    metrics,
    isLoading,
    isRefreshing,
    lastUpdated,
    refresh,
  };
}