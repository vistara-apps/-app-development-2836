import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'
import { generateRestaurantAudit } from '../services/auditService'
import { 
  TrendingUp, 
  Globe, 
  Share2, 
  BarChart3, 
  Download, 
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react'

const AuditPage = () => {
  const navigate = useNavigate()
  const { restaurant, auditData, setAuditData } = useRestaurant()
  const [loading, setLoading] = useState(!auditData)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!restaurant) {
      navigate('/onboarding')
      return
    }

    if (!auditData) {
      generateAudit()
    }
  }, [restaurant])

  const generateAudit = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await generateRestaurantAudit(restaurant)
      setAuditData(data)
    } catch (err) {
      setError('Failed to generate audit. Please try again.')
      console.error('Audit generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = () => {
    const reportData = {
      restaurant: restaurant.name,
      location: restaurant.location,
      auditDate: new Date().toLocaleDateString(),
      ...auditData
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${restaurant.name}-digital-audit.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Generating Your Digital Audit
          </h2>
          <p className="text-gray-600">
            Our AI is analyzing your restaurant's digital presence...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Audit Generation Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={generateAudit}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Digital Audit Report for {restaurant?.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            AI-powered analysis of your restaurant's digital presence and optimization opportunities
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDownloadReport}
              className="btn btn-secondary inline-flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </button>
            <button
              onClick={() => navigate('/optimization')}
              className="btn btn-primary inline-flex items-center"
            >
              View Optimization Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Audit Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <Share2 className="h-8 w-8 text-primary-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(auditData?.socialMediaAudit?.score)}`}>
                {auditData?.socialMediaAudit?.score}/100
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Social Media
            </h3>
            <p className="text-gray-600 text-sm">
              Overall social media performance and engagement analysis
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <Globe className="h-8 w-8 text-primary-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(auditData?.websiteAudit?.score)}`}>
                {auditData?.websiteAudit?.score}/100
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Website
            </h3>
            <p className="text-gray-600 text-sm">
              Website performance, SEO, and user experience evaluation
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-green-600">
                +${Math.floor(auditData?.revenueForecasting?.potentialIncrease / 1000)}K
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Revenue Potential
            </h3>
            <p className="text-gray-600 text-sm">
              Estimated annual revenue increase with optimization
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-primary-500" />
              <span className="text-sm text-gray-500">vs Industry</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Benchmarks
            </h3>
            <p className="text-gray-600 text-sm">
              Performance comparison with industry standards
            </p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Social Media Analysis */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Share2 className="h-6 w-6 text-primary-500 mr-2" />
              <h2 className="text-xl font-semibold">Social Media Analysis</h2>
            </div>
            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(auditData?.socialMediaAudit?.score)}`}>
                Score: {auditData?.socialMediaAudit?.score}/100
              </div>
            </div>
            <p className="text-gray-700 mb-6">{auditData?.socialMediaAudit?.analysis}</p>
            <div>
              <h4 className="font-semibold mb-3">Recommendations:</h4>
              <ul className="space-y-2">
                {auditData?.socialMediaAudit?.recommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Website Analysis */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-primary-500 mr-2" />
              <h2 className="text-xl font-semibold">Website Analysis</h2>
            </div>
            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(auditData?.websiteAudit?.score)}`}>
                Score: {auditData?.websiteAudit?.score}/100
              </div>
            </div>
            <p className="text-gray-700 mb-6">{auditData?.websiteAudit?.analysis}</p>
            <div>
              <h4 className="font-semibold mb-3">Recommendations:</h4>
              <ul className="space-y-2">
                {auditData?.websiteAudit?.recommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Revenue Forecasting */}
        <div className="card mt-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Revenue Forecasting</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${auditData?.revenueForecasting?.currentEstimate?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Current Annual Revenue</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                +${auditData?.revenueForecasting?.potentialIncrease?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Potential Increase</div>
            </div>
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {Math.round((auditData?.revenueForecasting?.potentialIncrease / auditData?.revenueForecasting?.currentEstimate) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Growth Percentage</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Optimization Scenarios:</h4>
            <div className="space-y-4">
              {auditData?.revenueForecasting?.scenarios?.map((scenario, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{scenario.name}</h5>
                    <span className="text-sm text-gray-500">{scenario.timeframe}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{scenario.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600">Investment: </span>
                      <span className="font-medium">${scenario.investment?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Expected Return: </span>
                      <span className="font-medium text-green-600">${scenario.expectedReturn?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditPage