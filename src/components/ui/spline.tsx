'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function LoadingSkeleton() {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden" aria-label="Loading 3D model" role="status" aria-live="polite">
      {/* Skeleton matching scene dimensions */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
        </div>
      {/* Subtle pulsing effect */}
      <div className="absolute inset-0 bg-primary/5 animate-pulse" />
      {/* Loading indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground font-mono">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>Loading 3D model...</span>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return <LoadingSkeleton />;
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
        <div className="absolute inset-0 z-10" aria-live="polite" aria-label="Loading 3D scene">
          <LoadingSkeleton />
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

