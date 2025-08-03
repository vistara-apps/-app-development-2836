import { useState, useCallback } from 'react'

let toastId = 0

export const useToast = () => {
  const [toasts, setToasts] = useState([])
  
  const addToast = useCallback((toast) => {
    const id = ++toastId
    const newToast = { id, ...toast }
    
    setToasts((prev) => [...prev, newToast])
    
    return id
  }, [])
  
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])
  
  const success = useCallback((title, message) => {
    return addToast({ type: 'success', title, message })
  }, [addToast])
  
  const error = useCallback((title, message) => {
    return addToast({ type: 'error', title, message })
  }, [addToast])
  
  const warning = useCallback((title, message) => {
    return addToast({ type: 'warning', title, message })
  }, [addToast])
  
  const info = useCallback((title, message) => {
    return addToast({ type: 'info', title, message })
  }, [addToast])
  
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
