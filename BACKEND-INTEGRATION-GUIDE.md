# 🔧 Backend Integration Guide

## Current Status: Frontend Only ⚠️

This dashboard is currently a **frontend-only application** with mock data. Here's how to add a backend:

## 🚀 Quick Backend Options

### Option 1: Next.js API Routes (Easiest)

#### Step 1: Create API Routes
```bash
mkdir -p src/app/api/dashboard
mkdir -p src/app/api/campaigns
mkdir -p src/app/api/metrics
```

#### Step 2: Add Database Connection
```typescript
// src/lib/database.ts
import { Pool } from 'pg'; // or your preferred database

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

#### Step 3: Create API Endpoints
```typescript
// src/app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
  try {
    const metrics = await db.query('SELECT * FROM metrics ORDER BY date DESC LIMIT 1');
    const campaigns = await db.query('SELECT * FROM campaigns WHERE status = $1', ['active']);
    
    return NextResponse.json({
      metrics: metrics.rows[0],
      campaigns: campaigns.rows,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

#### Step 4: Update Frontend to Use API
```typescript
// src/hooks/use-dashboard-data.ts
const fetchDashboardData = async () => {
  const response = await fetch('/api/dashboard');
  const data = await response.json();
  return data;
};
```

### Option 2: Supabase Integration (No Backend Code)

#### Step 1: Install Supabase
```bash
npm install @supabase/supabase-js
```

#### Step 2: Setup Supabase Client
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### Step 3: Create Database Tables
```sql
-- Metrics table
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  revenue DECIMAL(12,2),
  users INTEGER,
  conversions INTEGER,
  growth_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  impressions INTEGER,
  clicks INTEGER,
  ctr DECIMAL(5,2),
  conversions INTEGER,
  cost DECIMAL(10,2),
  roas DECIMAL(5,2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 4: Update Data Fetching
```typescript
// src/lib/data.ts
import { supabase } from './supabase';

export async function fetchMetrics() {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);
    
  if (error) throw error;
  return data[0];
}

export async function fetchCampaigns() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', 'active');
    
  if (error) throw error;
  return data;
}
```

### Option 3: External API Integration

#### Google Analytics Integration
```typescript
// src/lib/analytics.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'path/to/service-account-key.json',
});

export async function getAnalyticsData() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'sessions' },
      { name: 'users' },
      { name: 'conversions' }
    ],
    dimensions: [{ name: 'date' }],
  });

  return response;
}
```

## 🗄️ Database Schema Examples

### PostgreSQL Schema
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Metrics table
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  revenue DECIMAL(12,2),
  users INTEGER,
  conversions INTEGER,
  growth_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  platform VARCHAR(100),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost DECIMAL(10,2) DEFAULT 0,
  roas DECIMAL(5,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Revenue data table
CREATE TABLE revenue_data (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  month VARCHAR(20),
  revenue DECIMAL(12,2),
  target DECIMAL(12,2),
  growth DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication Integration

### NextAuth.js Setup
```bash
npm install next-auth
```

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

## 🌐 Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/admybrand"

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Analytics APIs
GOOGLE_ANALYTICS_PROPERTY_ID="your-ga-property-id"
FACEBOOK_ACCESS_TOKEN="your-fb-access-token"
```

## 📊 Real-time Updates

### WebSocket Integration
```typescript
// src/lib/websocket.ts
import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001');

socket.on('metrics-update', (data) => {
  // Update dashboard data in real-time
  updateDashboardData(data);
});
```

### Server-Sent Events
```typescript
// src/app/api/events/route.ts
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const data = `data: ${JSON.stringify({ 
          timestamp: Date.now(),
          metrics: getCurrentMetrics() 
        })}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      }, 5000);

      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

## 🚀 Deployment with Backend

### Vercel (with Database)
```json
// vercel.json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

### Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance Considerations

### Caching Strategy
```typescript
// src/lib/cache.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedData(key: string) {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setCachedData(key: string, data: any, ttl = 300) {
  await redis.setex(key, ttl, JSON.stringify(data));
}
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_campaigns_user_status ON campaigns(user_id, status);
CREATE INDEX idx_metrics_user_date ON metrics(user_id, date DESC);
CREATE INDEX idx_revenue_user_month ON revenue_data(user_id, month);
```

## 🔧 Migration Steps

1. **Choose your backend approach** (Next.js API, Supabase, or external)
2. **Set up database** and create tables
3. **Create API endpoints** or configure external services
4. **Update frontend data fetching** to use real APIs
5. **Add authentication** if needed
6. **Test thoroughly** with real data
7. **Deploy** with environment variables

## 📚 Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Current Status:** Frontend Only  
**Recommended Next Step:** Add Next.js API routes with Supabase for quickest backend integration