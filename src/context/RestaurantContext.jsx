import React, { createContext, useContext, useState } from 'react'

const RestaurantContext = createContext()

export const useRestaurant = () => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider')
  }
  return context
}

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null)
  const [auditData, setAuditData] = useState(null)
  const [optimizationScenarios, setOptimizationScenarios] = useState([])
  const [benchmarks, setBenchmarks] = useState(null)

  const value = {
    restaurant,
    setRestaurant,
    auditData,
    setAuditData,
    optimizationScenarios,
    setOptimizationScenarios,
    benchmarks,
    setBenchmarks,
  }

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  )
}