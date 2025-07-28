"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Home,
  TrendingUp,
  Users,
  Target,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationPage } from "@/components/navigation/navigation-handler";
import toast from 'react-hot-toast';

interface SidebarProps {
  className?: string;
  currentPage?: NavigationPage;
  onPageChange?: (page: NavigationPage) => void;
}

const navigation = [
  {
    name: "Overview",
    page: "overview" as NavigationPage,
    icon: Home,
    badge: null,
  },
  {
    name: "Analytics",
    page: "analytics" as NavigationPage,
    icon: BarChart3,
    badge: "New",
  },
  {
    name: "Campaigns",
    page: "campaigns" as NavigationPage,
    icon: Target,
    badge: null,
  },
  {
    name: "Audience",
    page: "audience" as NavigationPage,
    icon: Users,
    badge: null,
  },
  {
    name: "Performance",
    page: "performance" as NavigationPage,
    icon: TrendingUp,
    badge: null,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    page: "settings" as NavigationPage,
    icon: Settings,
  },
  {
    name: "Help",
    page: "help" as NavigationPage,
    icon: HelpCircle,
  },
];

export function Sidebar({ className, currentPage = 'overview', onPageChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (page: NavigationPage, name: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex h-16 items-center justify-end px-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => handleNavigation(item.page, item.name)}
              >
                <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-4 border-t" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => handleNavigation(item.page, item.name)}
              >
                <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* User Info - Bottom */}
      {!collapsed && (
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                JD
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john@admybrand.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}