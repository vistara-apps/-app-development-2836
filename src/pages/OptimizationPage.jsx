import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ArrowRight,
  Star,
  Target
} from 'lucide-react'

const OptimizationPage = () => {
  const navigate = useNavigate()
  const { restaurant, auditData, optimizationScenarios, setOptimizationScenarios } = useRestaurant()
  const [selectedScenarios, setSelectedScenarios] = useState([])

  if (!restaurant || !auditData) {
    navigate('/onboarding')
    return null
  }

  const handleScenarioSelect = (scenarioIndex) => {
    setSelectedScenarios(prev => 
      prev.includes(scenarioIndex)
        ? prev.filter(i => i !== scenarioIndex)
        : [...prev, scenarioIndex]
    )
  }

  const calculateTotalInvestment = () => {
    return selectedScenarios.reduce((total, index) => {
      return total + (auditData.revenueForecasting.scenarios[index]?.investment || 0)
    }, 0)
  }

  const calculateTotalReturn = () => {
    return selectedScenarios.reduce((total, index) => {
      return total + (auditData.revenueForecasting.scenarios[index]?.expectedReturn || 0)
    }, 0)
  }

  const handleProceedToSubscription = () => {
    const selectedPlans = selectedScenarios.map(index => auditData.revenueForecasting.scenarios[index])
    setOptimizationScenarios(selectedPlans)
    navigate('/subscription')
  }

  const priorityActions = [
    {
      title: 'Optimize Social Media Posting Schedule',
      description: 'Post consistently during peak engagement hours',
      priority: 'High',
      effort: 'Low',
      impact: 'High',
    },
    {
      title: 'Implement Online Reservation System',
      description: 'Add booking functionality to your website',
      priority: 'High',
      effort: 'Medium',
      impact: 'High',
    },
    {
      title: 'Create Google My Business Profile',
      description: 'Improve local search visibility and customer reviews',
      priority: 'Medium',
      effort: 'Low',
      impact: 'Medium',
    },
    {
      title: 'Launch Email Marketing Campaign',
      description: 'Build customer relationships with regular newsletters',
      priority: 'Medium',
      effort: 'Medium',
      impact: 'Medium',
    },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Optimization Plan for {restaurant.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Choose your optimization scenarios and start boosting your revenue
          </p>
        </div>

        {/* Priority Actions */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <Target className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Priority Actions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {priorityActions.map((action, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Effort: {action.effort}</span>
                  <span>Impact: {action.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Scenarios */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Optimization Scenarios
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {auditData.revenueForecasting.scenarios.map((scenario, index) => (
              <div 
                key={index} 
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedScenarios.includes(index) 
                    ? 'ring-2 ring-primary-500 bg-primary-50' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleScenarioSelect(index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedScenarios.includes(index)
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedScenarios.includes(index) && (
                      <CheckCircle className="h-4 w-4 text-white" fill="currentColor" />
                    )}
                  </div>
                  <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {scenario.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {scenario.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-sm">Investment</span>
                    </div>
                    <span className="font-medium">
                      ${scenario.investment?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">Expected Return</span>
                    </div>
                    <span className="font-medium text-green-600">
                      ${scenario.expectedReturn?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Timeframe</span>
                    </div>
                    <span className="font-medium">
                      {scenario.timeframe}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">ROI</span>
                      <span className="font-bold text-primary-600">
                        {Math.round((scenario.expectedReturn / scenario.investment) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Scenarios Summary */}
        {selectedScenarios.length > 0 && (
          <div className="card bg-primary-50 border border-primary-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Optimization Plan
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {selectedScenarios.length}
                </div>
                <div className="text-sm text-gray-600">Scenarios Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  ${calculateTotalInvestment().toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${calculateTotalReturn().toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Expected Return</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-4">
                Projected ROI: <span className="font-bold text-primary-600">
                  {Math.round((calculateTotalReturn() / calculateTotalInvestment()) * 100)}%
                </span>
              </div>
              <button
                onClick={handleProceedToSubscription}
                className="btn btn-primary inline-flex items-center"
              >
                Get Started with This Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Implementation Timeline */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Implementation Timeline
          </h3>
          
          <div className="space-y-4">
            {[
              { phase: 'Week 1-2', title: 'Setup & Assessment', description: 'Initial account setup and baseline measurement' },
              { phase: 'Week 3-6', title: 'Quick Wins', description: 'Implement high-impact, low-effort optimizations' },
              { phase: 'Week 7-12', title: 'Medium-term Strategies', description: 'Roll out comprehensive digital marketing campaigns' },
              { phase: 'Month 4-6', title: 'Advanced Optimization', description: 'Advanced features and ongoing optimization' },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-20 text-sm font-medium text-primary-600 mt-1">
                  {item.phase}
                </div>
                <div className="flex-1 ml-4">
                  <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OptimizationPage