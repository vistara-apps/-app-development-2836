import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  BarChart3, 
  Globe, 
  Share2, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'

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
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <Badge variant="primary" className="mb-6 inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Restaurant Analytics
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
              Unlock Your Restaurant's
              <span className="text-gradient block">Digital Potential</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              AI-powered insights and optimization tools to boost your restaurant's 
              online presence, engagement, and revenue through data-driven strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                as={Link}
                to="/onboarding"
                size="lg"
                className="text-lg px-8 py-4 shadow-large hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Free Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                as={Link}
                to="/dashboard"
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                View Demo
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="flex items-center justify-center space-x-8 text-secondary-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900">500+</div>
                <div className="text-sm">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900">85%</div>
                <div className="text-sm">Revenue Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900">24/7</div>
                <div className="text-sm">AI Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <Badge variant="secondary" className="mb-4">
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Comprehensive Digital Analysis
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Our AI-powered platform analyzes every aspect of your digital presence 
              to provide actionable insights and growth opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                hover 
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card.Body>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <Badge variant="success" className="mb-4">
                Proven Results
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Transform Your Restaurant's Digital Success
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Join hundreds of restaurants that have already boosted their 
                revenue and customer engagement with our AI-powered optimization platform.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className="flex items-center animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-success-600" />
                    </div>
                    <span className="text-secondary-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 border-primary-200 animate-slide-up">
              <Card.Body className="text-center p-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="group">
                    <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-200">85%</div>
                    <div className="text-secondary-700 font-medium">Average Revenue Increase</div>
                  </div>
                  <div className="group">
                    <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-200">300%</div>
                    <div className="text-secondary-700 font-medium">Social Engagement Boost</div>
                  </div>
                  <div className="group">
                    <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-200">60%</div>
                    <div className="text-secondary-700 font-medium">Website Conversion Improvement</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-2xl opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <Badge variant="warning" className="mb-6 bg-white bg-opacity-20 text-white border-white border-opacity-30">
            <Zap className="w-4 h-4 mr-2" />
            Limited Time Offer
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Boost Your Restaurant's Digital Presence?
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Get started with a free digital audit and see how much revenue you could be missing.
            No credit card required.
          </p>
          
          <Button
            as={Link}
            to="/onboarding"
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-4 shadow-large hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Start Your Free Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="mt-6 text-primary-200 text-sm">
            ✓ Free forever plan available  ✓ No setup fees  ✓ Cancel anytime
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
