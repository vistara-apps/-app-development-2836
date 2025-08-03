import React, { useState } from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react'

const SubscriptionPage = () => {
  const { restaurant, optimizationScenarios } = useRestaurant()
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = {
    starter: {
      name: 'Starter',
      monthlyPrice: 99,
      annualPrice: 990,
      icon: Zap,
      description: 'Perfect for small restaurants getting started',
      features: [
        'Basic social media audit',
        'Website performance analysis',
        'Monthly optimization reports',
        'Email support',
        'Basic revenue forecasting',
      ],
      maxLocations: 1,
      supportLevel: 'Email',
    },
    professional: {
      name: 'Professional',
      monthlyPrice: 199,
      annualPrice: 1990,
      icon: Star,
      description: 'Most popular for growing restaurants',
      features: [
        'Comprehensive digital audit',
        'Advanced analytics dashboard',
        'Weekly optimization reports',
        'Phone & chat support',
        'Advanced revenue forecasting',
        'Competitor benchmarking',
        'Social media scheduling tools',
        'SEO optimization guidance',
      ],
      maxLocations: 3,
      supportLevel: 'Phone & Chat',
      popular: true,
    },
    enterprise: {
      name: 'Enterprise',
      monthlyPrice: 399,
      annualPrice: 3990,
      icon: Crown,
      description: 'For restaurant chains and franchises',
      features: [
        'Everything in Professional',
        'Multi-location management',
        'Custom integrations',
        'Dedicated account manager',
        'White-label reporting',
        'API access',
        'Priority support',
        'Custom optimization strategies',
        'Quarterly strategy sessions',
      ],
      maxLocations: 'Unlimited',
      supportLevel: 'Dedicated Manager',
    },
  }

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)
  }

  const getDynamicPrice = () => {
    if (!restaurant || !optimizationScenarios?.length) return getPrice(plans[selectedPlan])
    
    // Dynamic pricing based on restaurant size and selected scenarios
    const basePrice = getPrice(plans[selectedPlan])
    const sizeMultiplier = restaurant.size === 'large' ? 1.3 : restaurant.size === 'medium' ? 1.1 : 1
    const scenarioComplexity = optimizationScenarios.length * 0.1
    
    return Math.round(basePrice * sizeMultiplier * (1 + scenarioComplexity))
  }

  const handleSubscribe = (plan) => {
    // In a real app, this would integrate with Stripe or another payment processor
    alert(`Subscribing to ${plan.name} plan for $${getDynamicPrice()}/month`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Growth Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start boosting your restaurant's digital presence today
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600'
              }`}
            >
              Annual
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Custom Pricing Banner */}
        {restaurant && optimizationScenarios?.length > 0 && (
          <div className="bg-primary-600 text-white rounded-xl p-6 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Custom Pricing for {restaurant.name}
              </h3>
              <p className="text-primary-100">
                Based on your restaurant size ({restaurant.size}) and {optimizationScenarios.length} selected optimization scenarios
              </p>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`card relative ${
                plan.popular
                  ? 'ring-2 ring-primary-500 shadow-xl'
                  : selectedPlan === key
                  ? 'ring-2 ring-gray-300'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <plan.icon className={`h-12 w-12 mx-auto mb-4 ${
                  plan.popular ? 'text-primary-500' : 'text-gray-400'
                }`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${selectedPlan === key ? getDynamicPrice() : getPrice(plan)}
                  </span>
                  <span className="text-gray-600">/month</span>
                  {billingCycle === 'annual' && (
                    <div className="text-sm text-green-600 mt-1">
                      Save ${Math.round((getPrice(plan) * 12 - plan.annualPrice) / 12)}/month
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Max Locations:</span>
                  <span className="font-medium">{plan.maxLocations}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support:</span>
                  <span className="font-medium">{plan.supportLevel}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlan(key)
                  handleSubscribe(plan)
                }}
                className={`w-full btn ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary hover:bg-gray-300'
                }`}
              >
                {selectedPlan === key ? 'Subscribe Now' : 'Select Plan'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            What's Included
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  30-Day Money-Back Guarantee
                </h4>
                <p className="text-gray-600 text-sm">
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-blue-500 mr-3 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  24/7 Platform Access
                </h4>
                <p className="text-gray-600 text-sm">
                  Monitor your progress anytime, anywhere.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="h-6 w-6 text-purple-500 mr-3 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Secure Payment Processing
                </h4>
                <p className="text-gray-600 text-sm">
                  Your payment information is always protected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
              },
              {
                question: 'What if I have multiple restaurant locations?',
                answer: 'Our Professional plan supports up to 3 locations, while Enterprise offers unlimited locations with multi-location management tools.'
              },
              {
                question: 'Do you offer custom solutions?',
                answer: 'Yes, Enterprise customers can access custom integrations and dedicated support for unique requirements.'
              },
              {
                question: 'How quickly will I see results?',
                answer: 'Most customers see improvements in their digital metrics within 2-4 weeks, with significant revenue impact within 2-3 months.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage