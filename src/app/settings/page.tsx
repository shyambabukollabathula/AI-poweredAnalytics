"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Mail,
  Smartphone,
  Globe,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
} from "lucide-react";
import toast from 'react-hot-toast';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences',
    icon: User,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure how you receive alerts and updates',
    icon: Bell,
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Manage your account security and privacy settings',
    icon: Shield,
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: Palette,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with third-party services and APIs',
    icon: Database,
  },
];

export default function SettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@admybrand.com',
      company: 'ADmyBRAND',
      timezone: 'UTC-5',
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: true,
      campaignUpdates: true,
      budgetAlerts: true,
      performanceInsights: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true,
    },
    appearance: {
      theme: 'system',
      compactMode: false,
      showAnimations: true,
    },
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!', {
      icon: '✅',
      duration: 2000,
    });
  };

  const handleResetSettings = () => {
    toast.success('Settings reset to defaults!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  const handleExportData = () => {
    toast.success('Data export initiated!', {
      icon: '📤',
      duration: 2000,
    });
  };

  const handleImportData = () => {
    toast.success('Data import completed!', {
      icon: '📥',
      duration: 2000,
    });
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={settings.profile.firstName}
            onChange={(e) => updateSetting('profile', 'firstName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={settings.profile.lastName}
            onChange={(e) => updateSetting('profile', 'lastName', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={settings.profile.email}
          onChange={(e) => updateSetting('profile', 'email', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={settings.profile.company}
          onChange={(e) => updateSetting('profile', 'company', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Input
          id="timezone"
          value={settings.profile.timezone}
          onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
            <p className="text-sm text-muted-foreground">
              {key === 'emailAlerts' && 'Receive important alerts via email'}
              {key === 'pushNotifications' && 'Get push notifications in your browser'}
              {key === 'weeklyReports' && 'Weekly performance summary reports'}
              {key === 'campaignUpdates' && 'Updates when campaigns start, pause, or end'}
              {key === 'budgetAlerts' && 'Alerts when budgets reach spending thresholds'}
              {key === 'performanceInsights' && 'AI-powered performance insights and recommendations'}
            </p>
          </div>
          <Switch
            checked={value}
            onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
          />
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Two-Factor Authentication</Label>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.security.twoFactorAuth}
            onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
          />
          {settings.security.twoFactorAuth && (
            <Badge variant="secondary">Enabled</Badge>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
        <Input
          id="sessionTimeout"
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Login Alerts</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when someone logs into your account
          </p>
        </div>
        <Switch
          checked={settings.security.loginAlerts}
          onCheckedChange={(checked) => updateSetting('security', 'loginAlerts', checked)}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-semibold">Data Management</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="destructive" onClick={() => toast.error('Account deletion requires email confirmation')}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Theme Preference</Label>
        <div className="flex gap-2">
          {['light', 'dark', 'system'].map((theme) => (
            <Button
              key={theme}
              variant={settings.appearance.theme === theme ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('appearance', 'theme', theme)}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Compact Mode</Label>
          <p className="text-sm text-muted-foreground">
            Reduce spacing and padding for more content
          </p>
        </div>
        <Switch
          checked={settings.appearance.compactMode}
          onCheckedChange={(checked) => updateSetting('appearance', 'compactMode', checked)}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Show Animations</Label>
          <p className="text-sm text-muted-foreground">
            Enable smooth transitions and animations
          </p>
        </div>
        <Switch
          checked={settings.appearance.showAnimations}
          onCheckedChange={(checked) => updateSetting('appearance', 'showAnimations', checked)}
        />
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {[
          { name: 'Google Ads', status: 'connected', icon: Globe },
          { name: 'Facebook Ads', status: 'connected', icon: Globe },
          { name: 'Google Analytics', status: 'connected', icon: Globe },
          { name: 'Shopify', status: 'disconnected', icon: Globe },
          { name: 'Slack', status: 'disconnected', icon: Globe },
        ].map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <integration.icon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h4 className="font-semibold">{integration.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {integration.status === 'connected' ? 'Connected and syncing' : 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                {integration.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success(`${integration.status === 'connected' ? 'Disconnected from' : 'Connected to'} ${integration.name}`)}
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return renderProfileSettings();
    }
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
                <Settings className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Settings</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Manage your account preferences and configuration
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Settings Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {settingsSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                            activeSection === section.id ? 'bg-muted border-r-2 border-primary' : ''
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{section.title}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              {section.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {settingsSections.find(s => s.id === activeSection)?.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {settingsSections.find(s => s.id === activeSection)?.description}
                  </p>
                </CardHeader>
                <CardContent>
                  {renderSettingsContent()}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}