"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
  BarChart3,
  Info,
  Calendar,
  Activity
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MetricCardProps {
  metric: MetricCardType;
  index: number;
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  target: Target,
  trending: TrendingUp,
};

export function MetricCard({ metric, index }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleCardClick = () => {
    // Navigate to analytics page for detailed view
    router.push('/analytics');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to analytics page for detailed breakdown
    router.push('/analytics');
  };

  const isPositive = metric.changeType === "increase";

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0
    }
  };



  return (
    <TooltipProvider>
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: "easeOut"
        }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card 
              className="relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group cursor-pointer border-0 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm hover:z-[10000]"
              onClick={handleCardClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {metric.title}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click for detailed analytics</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
                        onClick={handleViewDetails}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View detailed breakdown</p>
                    </TooltipContent>
                  </Tooltip>
                  <motion.div 
                    className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-lg"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <motion.div 
                    className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2, ease: "easeInOut" }
                    }}
                  >
                    {metric.value}
                  </motion.div>
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                    >
                      <Badge
                        variant={isPositive ? "default" : "destructive"}
                        className={`flex items-center space-x-1 transition-all duration-300 ${
                          isPositive 
                            ? "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20" 
                            : "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20"
                        }`}
                      >
                        <motion.div
                          animate={{ 
                            y: isPositive ? [-2, 2, -2] : [2, -2, 2],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                        </motion.div>
                        <span>{Math.abs(metric.change)}%</span>
                      </Badge>
                    </motion.div>
                    {metric.description && (
                      <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                        {metric.description}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              {/* Animated background effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent"
                initial={{ opacity: 0, x: -100 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -100
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              {/* Pulse ring effect */}
              <motion.div
                className="absolute top-4 right-4 h-2 w-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 z-[99999]" side="top" align="start">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">{metric.title} Details</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Value:</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Change:</span>
                  <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{metric.change}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trend:</span>
                  <span className="font-medium">{isPositive ? 'Increasing' : 'Decreasing'}</span>
                </div>
                {metric.description && (
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground">{metric.description}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Last updated: Just now</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </motion.div>
    </TooltipProvider>
  );
}