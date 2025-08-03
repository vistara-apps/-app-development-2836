import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  BarChart3, 
  Globe, 
  Share2, 
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: Share2,
      title: 'Social Media Audit',
      description: 'Analyze your social media presence and engagement to boost customer interaction',
    },
    {
      icon: Globe,
      title: 'Website Optimization',
      description: 'Evaluate and improve your website for better user experience and conversions',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Forecasting',
      description: 'Predict revenue impact from digital optimization with AI-powered insights',
    },
    {
      icon: BarChart3,
      title: 'Industry Benchmarking',
      description: 'Compare your performance against industry peers and competitors',
    },
  ]

  const benefits = [
    'Increase customer engagement by up to 300%',
    'Boost online visibility and search rankings',
    'Optimize conversion rates and revenue',
    'Make data-driven marketing decisions',
    'Stay ahead of industry competitors',
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unlock Your Restaurant's
              <span className="text-primary-500 block">Digital Potential</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered insights and optimization tools to boost your restaurant's 
              online presence, engagement, and revenue through data-driven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/onboarding"
                className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Start Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="btn btn-secondary text-lg px-8 py-3"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Digital Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes every aspect of your digital presence 
              to provide actionable insights and growth opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <feature.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform Your Restaurant's Digital Success
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of restaurants that have already boosted their 
                revenue and customer engagement with our AI-powered optimization platform.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">85%</div>
                <div className="text-gray-700 mb-4">Average Revenue Increase</div>
                <div className="text-4xl font-bold text-primary-600 mb-2">300%</div>
                <div className="text-gray-700 mb-4">Social Engagement Boost</div>
                <div className="text-4xl font-bold text-primary-600 mb-2">60%</div>
                <div className="text-gray-700">Website Conversion Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Boost Your Restaurant's Digital Presence?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get started with a free digital audit and see how much revenue you could be missing.
          </p>
          <Link
            to="/onboarding"
            className="bg-white text-primary-600 hover:bg-gray-100 btn text-lg px-8 py-3 inline-flex items-center"
          >
            Start Your Free Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage