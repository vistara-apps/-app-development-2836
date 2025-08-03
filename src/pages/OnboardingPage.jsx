import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'
import { ChevronRight, MapPin, Users, Utensils } from 'lucide-react'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const { setRestaurant } = useRestaurant()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    cuisine: '',
    website: '',
    instagram: '',
    facebook: '',
    twitter: '',
    goals: []
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Save restaurant data and navigate to audit
      setRestaurant(formData)
      navigate('/audit')
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.location && formData.size && formData.cuisine
      case 2:
        return formData.website || formData.instagram || formData.facebook
      case 3:
        return formData.goals.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let's Get to Know Your Restaurant
          </h1>
          <p className="text-gray-600">
            Step {step} of 3 - This helps us provide personalized insights
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    num <= step
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      num < step ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <Utensils className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Restaurant Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your restaurant name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Size
                    </label>
                    <select
                      className="input"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (1-20 seats)</option>
                      <option value="medium">Medium (21-50 seats)</option>
                      <option value="large">Large (51+ seats)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuisine Type
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.cuisine}
                      onChange={(e) => handleInputChange('cuisine', e.target.value)}
                      placeholder="e.g., Italian, Mexican"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Digital Presence */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Digital Presence</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    className="input"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourrestaurant.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="@yourrestaurant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      placeholder="Facebook page URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      placeholder="@yourrestaurant"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Don't worry if you don't have all social media accounts - we'll work with what you have!
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Your Goals</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 mb-6">
                  What would you like to achieve with your digital presence? (Select all that apply)
                </p>

                {[
                  'Increase social media followers',
                  'Improve website traffic',
                  'Boost online orders',
                  'Enhance customer engagement',
                  'Better online reviews',
                  'Increase table reservations',
                  'Expand delivery reach',
                  'Improve local SEO',
                ].map((goal) => (
                  <label key={goal} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
              >
                Previous
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`btn flex items-center ml-auto ${
                isStepValid() ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 3 ? 'Generate Audit' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage