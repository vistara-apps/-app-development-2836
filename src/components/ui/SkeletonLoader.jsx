import React from 'react'
import { clsx } from 'clsx'

const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'skeleton',
        width,
        height,
        className
      )}
      {...props}
    />
  )
}

const SkeletonCard = ({ className, ...props }) => {
  return (
    <div className={clsx('card animate-pulse', className)} {...props}>
      <div className="card-body space-y-4">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-8 w-24"></div>
      </div>
    </div>
  )
}

const SkeletonText = ({ lines = 3, className, ...props }) => {
  return (
    <div className={clsx('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          width={index === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  )
}

SkeletonLoader.Card = SkeletonCard
SkeletonLoader.Text = SkeletonText

export default SkeletonLoader
