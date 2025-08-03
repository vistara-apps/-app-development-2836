import React from 'react'
import { clsx } from 'clsx'

const Badge = ({ 
  children, 
  variant = 'primary', 
  className,
  ...props 
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  }
  
  return (
    <span
      className={clsx(
        'badge',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
