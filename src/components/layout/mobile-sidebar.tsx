"use client";

import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationPage } from "@/components/navigation/navigation-handler";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

export function MobileSidebar({ isOpen, onClose, currentPage = 'overview', onPageChange }: MobileSidebarProps) {
  const handleNavigation = (page: NavigationPage, name: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
    onClose();
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-card border-r lg:hidden"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold leading-none">ADmyBRAND</h1>
                  <p className="text-xs text-muted-foreground">Insights</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
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
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.page, item.name)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
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
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.page, item.name)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </Button>
                  );
                })}
              </div>
            </nav>

            {/* User Info - Bottom */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}