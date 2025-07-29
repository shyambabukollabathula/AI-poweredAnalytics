"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Target,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
} from "lucide-react";
import toast from 'react-hot-toast';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'active',
    budget: 5000,
    spent: 3250,
    impressions: 125000,
    clicks: 6250,
    conversions: 312,
    ctr: 5.0,
    cpc: 0.52,
    roas: 4.2,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: '2',
    name: 'Holiday Promotion',
    status: 'active',
    budget: 8000,
    spent: 6800,
    impressions: 200000,
    clicks: 10000,
    conversions: 450,
    ctr: 5.0,
    cpc: 0.68,
    roas: 3.8,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
  },
  {
    id: '3',
    name: 'Brand Awareness Q4',
    status: 'paused',
    budget: 3000,
    spent: 1200,
    impressions: 80000,
    clicks: 2400,
    conversions: 96,
    ctr: 3.0,
    cpc: 0.50,
    roas: 2.1,
    startDate: '2024-10-01',
    endDate: '2024-12-31',
  },
  {
    id: '4',
    name: 'New Product Launch',
    status: 'draft',
    budget: 10000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
    startDate: '2024-12-15',
    endDate: '2025-02-15',
  },
];

export default function CampaignsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCampaign = () => {
    toast.success('Opening campaign creation wizard...', {
      icon: '🚀',
      duration: 2000,
    });
  };

  const handleCampaignAction = (action: string, campaignName: string) => {
    toast.success(`${action} campaign: ${campaignName}`, {
      icon: action === 'Play' ? '▶️' : action === 'Pause' ? '⏸️' : '✏️',
      duration: 2000,
    });
  };

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      active: 'default',
      paused: 'secondary',
      draft: 'outline',
    } as const;

    const colors = {
      active: 'text-green-600',
      paused: 'text-yellow-600',
      draft: 'text-gray-600',
    };

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex">
        <Sidebar className="hidden lg:flex" />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-x-auto min-h-screen">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
          >
            <div>
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Campaign Management</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Create, manage, and optimize your advertising campaigns
              </p>
            </div>
            
            <Button onClick={handleCreateCampaign} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Campaign</span>
            </Button>
          </motion.div>

          {/* Campaign Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(campaigns.reduce((sum, c) => sum + c.conversions, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. ROAS</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.filter(c => c.roas > 0).length).toFixed(1)}x
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.3x</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'paused' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('paused')}
              >
                Paused
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('draft')}
              >
                Draft
              </Button>
            </div>
          </motion.div>

          {/* Campaigns Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Campaigns ({filteredCampaigns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          {getStatusBadge(campaign.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Spent</p>
                            <p className="font-medium">{formatCurrency(campaign.spent)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Impressions</p>
                            <p className="font-medium">{formatNumber(campaign.impressions)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Clicks</p>
                            <p className="font-medium">{formatNumber(campaign.clicks)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">CTR</p>
                            <p className="font-medium">{campaign.ctr.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ROAS</p>
                            <p className="font-medium">{campaign.roas.toFixed(1)}x</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {campaign.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCampaignAction('Pause', campaign.name)}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === 'paused' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCampaignAction('Play', campaign.name)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : null}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCampaignAction('Edit', campaign.name)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast(`Viewing details for ${campaign.name}`, { icon: '👁️' })}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}