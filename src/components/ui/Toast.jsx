import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { clsx } from 'clsx'
import Button from './Button'

const Toast = ({ 
  id,
  type = 'info', 
  title, 
  message, 
  duration = 5000,
  onClose,
  className,
  ...props 
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }
  
  const typeClasses = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-error-50 border-error-200 text-error-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }
  
  const iconClasses = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-blue-500',
  }
  
  const Icon = icons[type]
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])
  
  return (
    <div 
      className={clsx(
        'flex items-start p-4 border rounded-lg shadow-medium animate-slide-down max-w-sm',
        typeClasses[type],
        className
      )}
      {...props}
    >
      <Icon className={clsx('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', iconClasses[type])} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-medium text-sm mb-1">
            {title}
          </div>
        )}
        {message && (
          <div className="text-sm">
            {message}
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onClose(id)}
        className="p-1 ml-2 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts.length) return null
  
  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>,
    document.body
  )
}

export { Toast, ToastContainer }
export default Toast
