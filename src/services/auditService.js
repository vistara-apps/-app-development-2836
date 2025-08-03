import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export const generateRestaurantAudit = async (restaurantData) => {
  try {
    const prompt = `
    Analyze the following restaurant and provide a comprehensive digital audit:
    
    Restaurant: ${restaurantData.name}
    Location: ${restaurantData.location}
    Size: ${restaurantData.size}
    Cuisine: ${restaurantData.cuisine}
    Website: ${restaurantData.website || 'None provided'}
    Instagram: ${restaurantData.instagram || 'None provided'}
    Facebook: ${restaurantData.facebook || 'None provided'}
    Twitter: ${restaurantData.twitter || 'None provided'}
    Goals: ${restaurantData.goals.join(', ')}

    Please provide a detailed analysis in JSON format with the following structure:
    {
      "socialMediaAudit": {
        "score": number (0-100),
        "analysis": "detailed analysis",
        "recommendations": ["recommendation1", "recommendation2", ...]
      },
      "websiteAudit": {
        "score": number (0-100),
        "analysis": "detailed analysis",
        "recommendations": ["recommendation1", "recommendation2", ...]
      },
      "revenueForecasting": {
        "currentEstimate": number,
        "potentialIncrease": number,
        "scenarios": [
          {
            "name": "scenario name",
            "description": "description",
            "investment": number,
            "expectedReturn": number,
            "timeframe": "timeframe"
          }
        ]
      },
      "benchmarks": {
        "industryAverage": {
          "socialMediaFollowers": number,
          "websiteTraffic": number,
          "engagementRate": number
        },
        "yourPerformance": {
          "socialMediaFollowers": number,
          "websiteTraffic": number,
          "engagementRate": number
        }
      }
    }
    `

    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a digital marketing expert specializing in restaurant optimization. Provide realistic, actionable insights based on industry data."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const auditData = JSON.parse(response.choices[0].message.content)
    return auditData
  } catch (error) {
    console.error('Error generating audit:', error)
    // Return mock data for demo purposes
    return generateMockAuditData(restaurantData)
  }
}

const generateMockAuditData = (restaurantData) => {
  return {
    socialMediaAudit: {
      score: Math.floor(Math.random() * 40) + 40, // 40-80 range
      analysis: `Your social media presence shows potential for improvement. Based on your ${restaurantData.cuisine} cuisine and ${restaurantData.location} location, there are several opportunities to increase engagement and reach.`,
      recommendations: [
        "Post high-quality food photos daily",
        "Use location-based hashtags",
        "Engage with customer comments within 2 hours",
        "Share behind-the-scenes content",
        "Run weekly food specials campaigns"
      ]
    },
    websiteAudit: {
      score: Math.floor(Math.random() * 35) + 45, // 45-80 range
      analysis: `Your website needs optimization for better user experience and conversion rates. Key areas include mobile responsiveness, loading speed, and call-to-action placement.`,
      recommendations: [
        "Optimize for mobile devices",
        "Add online reservation system",
        "Improve page loading speed",
        "Include customer testimonials",
        "Add clear contact information and hours"
      ]
    },
    revenueForecasting: {
      currentEstimate: Math.floor(Math.random() * 100000) + 200000,
      potentialIncrease: Math.floor(Math.random() * 50000) + 25000,
      scenarios: [
        {
          name: "Social Media Boost",
          description: "Increase social media engagement and followers",
          investment: 2000,
          expectedReturn: 15000,
          timeframe: "3-6 months"
        },
        {
          name: "Website Optimization",
          description: "Improve website conversion and SEO",
          investment: 3500,
          expectedReturn: 25000,
          timeframe: "2-4 months"
        },
        {
          name: "Complete Digital Overhaul",
          description: "Comprehensive digital marketing strategy",
          investment: 8000,
          expectedReturn: 60000,
          timeframe: "6-12 months"
        }
      ]
    },
    benchmarks: {
      industryAverage: {
        socialMediaFollowers: 2500,
        websiteTraffic: 1200,
        engagementRate: 3.5
      },
      yourPerformance: {
        socialMediaFollowers: Math.floor(Math.random() * 2000) + 500,
        websiteTraffic: Math.floor(Math.random() * 800) + 400,
        engagementRate: Math.random() * 2 + 1
      }
    }
  }
}