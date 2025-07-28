"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  FileText,
  Users,
  Zap,
  ChevronRight,
  ExternalLink,
  Star,
} from "lucide-react";
import toast from 'react-hot-toast';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface HelpResource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'article' | 'tutorial';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ElementType;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create a new campaign?',
    answer: 'To create a new campaign, navigate to the Campaigns page and click the "Create Campaign" button. Follow the step-by-step wizard to set up your campaign objectives, targeting, budget, and creative assets.',
    category: 'campaigns',
    helpful: 45,
  },
  {
    id: '2',
    question: 'What is ROAS and how is it calculated?',
    answer: 'ROAS (Return on Ad Spend) measures the revenue generated for every dollar spent on advertising. It\'s calculated as: ROAS = Revenue / Ad Spend. For example, a 4:1 ROAS means you earn $4 for every $1 spent.',
    category: 'analytics',
    helpful: 38,
  },
  {
    id: '3',
    question: 'How can I improve my conversion rate?',
    answer: 'To improve conversion rates: 1) Optimize your landing pages, 2) Improve ad relevance and targeting, 3) Test different ad creatives, 4) Streamline your checkout process, 5) Use retargeting campaigns for warm audiences.',
    category: 'optimization',
    helpful: 52,
  },
  {
    id: '4',
    question: 'How do I set up budget alerts?',
    answer: 'Go to Settings > Notifications and enable "Budget Alerts". You can set custom thresholds (e.g., 80% of budget spent) to receive notifications via email or push notifications.',
    category: 'settings',
    helpful: 29,
  },
  {
    id: '5',
    question: 'Can I integrate with Google Analytics?',
    answer: 'Yes! Go to Settings > Integrations and connect your Google Analytics account. This will provide enhanced tracking and attribution data for your campaigns.',
    category: 'integrations',
    helpful: 41,
  },
];

const helpResources: HelpResource[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    description: 'Complete walkthrough for new users to set up their first campaign',
    type: 'guide',
    duration: '15 min read',
    difficulty: 'beginner',
    icon: Book,
  },
  {
    id: '2',
    title: 'Advanced Analytics Tutorial',
    description: 'Deep dive into analytics features and performance optimization',
    type: 'video',
    duration: '25 min watch',
    difficulty: 'advanced',
    icon: Video,
  },
  {
    id: '3',
    title: 'Campaign Optimization Best Practices',
    description: 'Learn proven strategies to improve your campaign performance',
    type: 'article',
    duration: '10 min read',
    difficulty: 'intermediate',
    icon: FileText,
  },
  {
    id: '4',
    title: 'API Documentation',
    description: 'Technical documentation for developers and advanced users',
    type: 'guide',
    duration: '30 min read',
    difficulty: 'advanced',
    icon: Book,
  },
];

export default function HelpPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'campaigns', label: 'Campaigns' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'optimization', label: 'Optimization' },
    { value: 'settings', label: 'Settings' },
    { value: 'integrations', label: 'Integrations' },
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSupport = (method: string) => {
    toast.success(`Opening ${method} support...`, {
      icon: method === 'chat' ? '💬' : method === 'email' ? '📧' : '📞',
      duration: 2000,
    });
  };

  const handleResourceClick = (resource: HelpResource) => {
    toast.success(`Opening: ${resource.title}`, {
      icon: '📖',
      duration: 2000,
    });
  };

  const handleFAQHelpful = (faqId: string) => {
    toast.success('Thank you for your feedback!', {
      icon: '👍',
      duration: 1500,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        currentPage="help"
      />
      
      <div className="flex">
        <Sidebar 
          className="hidden lg:flex" 
          currentPage="help"
        />
        
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Help Center</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to your questions, learn how to use our platform, and get the support you need
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, guides, and FAQs..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleContactSupport('chat')}>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Get instant help from our support team</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleContactSupport('email')}>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">Send us a detailed message</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleContactSupport('phone')}>
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">Call us for urgent issues</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Help Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Popular Resources</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Guides, tutorials, and documentation to help you succeed
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {helpResources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                                {resource.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{resource.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <div className="flex flex-wrap gap-2 mt-4">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border rounded-lg"
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      >
                        <h4 className="font-semibold">{faq.question}</h4>
                        <ChevronRight 
                          className={`h-4 w-4 transition-transform ${
                            expandedFAQ === faq.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4">
                          <p className="text-muted-foreground mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Was this helpful?</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFAQHelpful(faq.id)}
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Yes ({faq.helpful})
                              </Button>
                            </div>
                            <Badge variant="outline">{faq.category}</Badge>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No FAQs found matching your search.</p>
                      <Button variant="outline" className="mt-4" onClick={() => handleContactSupport('chat')}>
                        Contact Support
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Still Need Help?</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Our support team is here to help you succeed
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Support Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM EST
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Response Times</h4>
                    <p className="text-sm text-muted-foreground">
                      Live Chat: Immediate<br />
                      Email: Within 2 hours<br />
                      Phone: Within 1 hour
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}