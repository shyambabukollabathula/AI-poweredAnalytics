"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export type NavigationPage = 'overview' | 'analytics' | 'campaigns' | 'audience' | 'performance' | 'settings' | 'help';

interface NavigationHandlerProps {
  children: (currentPage: NavigationPage, setCurrentPage: (page: NavigationPage) => void) => React.ReactNode;
}

export function NavigationHandler({ children }: NavigationHandlerProps) {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const router = useRouter();

  const handlePageChange = (page: NavigationPage) => {
    // Show navigation feedback
    const pageNames = {
      overview: 'Dashboard Overview',
      analytics: 'Advanced Analytics',
      campaigns: 'Campaign Management',
      audience: 'Audience Insights',
      performance: 'Performance Reports',
      settings: 'Settings Panel',
      help: 'Help & Support'
    };

    toast.success(`Navigating to ${pageNames[page]}...`, {
      duration: 1500,
      icon: '🚀',
    });

    // Navigate to the actual page
    if (page === 'overview') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }

    setCurrentPage(page);
  };

  return <>{children(currentPage, handlePageChange)}</>;
}