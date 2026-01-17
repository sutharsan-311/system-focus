'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary absolute top-0 left-0"></div>
        </div>
        <p className="text-sm text-muted-foreground font-mono">Loading 3D model...</p>
      </div>
    </div>
  )
}

function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-center p-8">
        <p className="text-muted-foreground text-sm font-mono">3D model unavailable</p>
      </div>
    </div>
  )
}

function SplineWrapper({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isLoading])

  if (hasError) {
    return <ErrorFallback />
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <LoadingSpinner />
        </div>
      )}
      <Spline
        scene={scene}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

/**
 * SplineScene component - Wrapper for Spline 3D scenes with loading states and error handling.
 * Implements lazy loading, loading spinners, and graceful error fallbacks.
 * 
 * @param scene - URL to the Spline scene file
 * @param className - Optional CSS classes for styling
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SplineWrapper scene={scene} className={className} />
    </Suspense>
  )
}

