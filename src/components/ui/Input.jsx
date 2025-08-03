import React from 'react'
import { clsx } from 'clsx'

const Input = React.forwardRef(({ 
  label,
  error,
  help,
  size = 'md',
  className,
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'input-sm',
    md: '',
    lg: 'input-lg',
  }
  
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'input',
          error && 'input-error',
          sizeClasses[size],
          className
        )}
        {...props}
      />
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
      {help && !error && (
        <div className="form-help">
          {help}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
