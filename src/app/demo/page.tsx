"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DataTable } from "@/components/dashboard/data-table";
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton-simple";
import { AnimatedToast, ToastContainer } from "@/components/ui/animated-toast";
import { 
  Sparkles, 
  Zap, 
  Rocket, 
  Star, 
  Heart, 
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import toast from "react-hot-toast";

const demoMetrics = [
  {
    id: "1",
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeType: "increase" as const,
    icon: "dollar",
    description: "vs last month"
  },
  {
    id: "2",
    title: "Active Users",
    value: "2,350",
    change: 15.3,
    changeType: "increase" as const,
    icon: "users",
    description: "vs last month"
  },
  {
    id: "3",
    title: "Conversion Rate",
    value: "12.5%",
    change: -2.4,
    changeType: "decrease" as const,
    icon: "target",
    description: "vs last month"
  },
  {
    id: "4",
    title: "Growth Rate",
    value: "573",
    change: 8.7,
    changeType: "increase" as const,
    icon: "trending",
    description: "vs last month"
  }
];

const demoTableData = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    impressions: 125000,
    clicks: 3200,
    ctr: 2.56,
    conversions: 180,
    cost: 1250,
    roas: 3.2,
    status: "active" as const
  },
  {
    id: "2",
    campaign: "Black Friday Promo",
    impressions: 89000,
    clicks: 2100,
    ctr: 2.36,
    conversions: 95,
    cost: 890,
    roas: 2.8,
    status: "paused" as const
  },
  {
    id: "3",
    campaign: "Holiday Collection",
    impressions: 156000,
    clicks: 4200,
    ctr: 2.69,
    conversions: 220,
    cost: 1560,
    roas: 4.1,
    status: "active" as const
  }
];

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<any[]>([]);
  const [animationDemo, setAnimationDemo] = useState("idle");

  const addToast = (type: "success" | "error" | "warning" | "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      description: `This is a ${type} toast notification with animations!`,
      type,
      onClose: () => setToasts(prev => prev.filter(t => t.id !== id))
    };
    setToasts(prev => [...prev, newToast]);
  };

  const triggerLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.h1 
              className="text-4xl font-bold text-gradient-rainbow"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              🎨 Enhanced UI Demo
            </motion.h1>
            <p className="text-xl text-muted-foreground">
              Experience the power of animations, tooltips, and micro-interactions
            </p>
          </motion.div>

          {/* Animation Controls */}
          <motion.div variants={itemVariants}>
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span>Animation Playground</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={triggerLoadingDemo}
                        className="hover-glow"
                        disabled={isLoading}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {isLoading ? "Loading..." : "Trigger Loading"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show loading skeleton animations</p>
                    </TooltipContent>
                  </Tooltip>

                  <Button 
                    onClick={() => addToast("success")}
                    variant="outline"
                    className="hover-scale"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Success Toast
                  </Button>

                  <Button 
                    onClick={() => addToast("error")}
                    variant="outline"
                    className="hover-scale"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Error Toast
                  </Button>

                  <Button 
                    onClick={() => addToast("warning")}
                    variant="outline"
                    className="hover-scale"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Warning Toast
                  </Button>

                  <Button 
                    onClick={() => addToast("info")}
                    variant="outline"
                    className="hover-scale"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Info Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Elements Demo */}
          <motion.div variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge className="cursor-pointer hover-scale animate-pulse-slow">
                        Hover me for details
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Hover Card Demo</h4>
                        <p className="text-sm text-muted-foreground">
                          This is a beautiful hover card with smooth animations and detailed information.
                        </p>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Performance: Excellent</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="hover-glow">
                        Open Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enhanced Dialog</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>This dialog has smooth animations and backdrop blur effects.</p>
                        <Tabs defaultValue="tab1">
                          <TabsList>
                            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                          </TabsList>
                          <TabsContent value="tab1">
                            <p className="text-sm text-muted-foreground">Content for tab 1</p>
                          </TabsContent>
                          <TabsContent value="tab2">
                            <p className="text-sm text-muted-foreground">Content for tab 2</p>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <motion.div
                    className="inline-block"
                    animate={{ rotate: animationDemo === "rotate" ? 360 : 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    <Button 
                      onClick={() => setAnimationDemo(animationDemo === "rotate" ? "idle" : "rotate")}
                      variant="outline"
                      className="hover-scale"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Rotate Animation
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metric Cards Demo */}
          {isLoading ? (
            <motion.div variants={itemVariants}>
              <LoadingSkeleton />
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {demoMetrics.map((metric, index) => (
                  <MetricCard key={metric.id} metric={metric} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced Data Table */}
          {!isLoading && (
            <motion.div variants={itemVariants}>
              <DataTable data={demoTableData} />
            </motion.div>
          )}

          {/* CSS Animation Showcase */}
          <motion.div variants={itemVariants}>
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>CSS Animation Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-primary rounded-lg mx-auto animate-float"></div>
                    <p className="text-sm">Float</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-secondary rounded-lg mx-auto animate-bounce-slow"></div>
                    <p className="text-sm">Bounce</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-accent rounded-lg mx-auto animate-wiggle"></div>
                    <p className="text-sm">Wiggle</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto animate-glow"></div>
                    <p className="text-sm">Glow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center py-8">
            <p className="text-muted-foreground">
              ✨ Enhanced with Framer Motion, Radix UI, and custom animations
            </p>
          </motion.div>
        </motion.div>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} />
      </div>
    </TooltipProvider>
  );
}