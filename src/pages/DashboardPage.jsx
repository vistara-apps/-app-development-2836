import React from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Share2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react'

const DashboardPage = () => {
  const { restaurant, auditData } = useRestaurant()

  // Sample data for charts
  const performanceData = [
    { month: 'Jan', social: 65, website: 45, revenue: 15000 },
    { month: 'Feb', social: 72, website: 52, revenue: 18000 },
    { month: 'Mar', social: 78, website: 58, revenue: 22000 },
    { month: 'Apr', social: 85, website: 65, revenue: 25000 },
    { month: 'May', social: 88, website: 72, revenue: 28000 },
    { month: 'Jun', social: 92, website: 78, revenue: 32000 },
  ]

  const benchmarkData = [
    { name: 'Your Restaurant', value: auditData?.benchmarks?.yourPerformance?.socialMediaFollowers || 1200 },
    { name: 'Industry Average', value: auditData?.benchmarks?.industryAverage?.socialMediaFollowers || 2500 },
  ]

  const engagementData = [
    { name: 'Likes', value: 45, color: '#f39533' },
    { name: 'Comments', value: 25, color: '#f17509' },
    { name: 'Shares', value: 20, color: '#e25c04' },
    { name: 'Saves', value: 10, color: '#bb4507' },
  ]

  const metrics = [
    {
      title: 'Social Media Score',
      value: auditData?.socialMediaAudit?.score || 75,
      change: '+5.2%',
      positive: true,
      icon: Share2,
    },
    {
      title: 'Website Performance',
      value: auditData?.websiteAudit?.score || 68,
      change: '+3.1%',
      positive: true,
      icon: Globe,
    },
    {
      title: 'Monthly Revenue',
      value: '$32,000',
      change: '+12.5%',
      positive: true,
      icon: TrendingUp,
    },
    {
      title: 'Online Followers',
      value: '2,450',
      change: '-2.3%',
      positive: false,
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {restaurant ? `${restaurant.name} Dashboard` : 'Restaurant Dashboard'}
          </h1>
          <p className="text-gray-600">
            Real-time insights into your restaurant's digital performance
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="h-8 w-8 text-primary-500" />
                <div className={`flex items-center text-sm font-medium ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.positive ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Trend */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="social" 
                  stroke="#f39533" 
                  strokeWidth={2}
                  name="Social Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="website" 
                  stroke="#e25c04" 
                  strokeWidth={2}
                  name="Website Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Growth */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#f39533" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Benchmark Comparison */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Industry Benchmark
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f39533" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Breakdown */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Engagement Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="btn btn-primary">
              Run New Audit
            </button>
            <button className="btn btn-secondary">
              Schedule Social Posts
            </button>
            <button className="btn btn-secondary">
              Update Website Content
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage