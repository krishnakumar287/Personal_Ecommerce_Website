export default function Loading() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product images skeleton */}
          <div className="space-y-4">
            <div className="shimmer w-full aspect-square rounded-lg"></div>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shimmer w-20 h-20 rounded-md"></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="space-y-6">
            <div className="shimmer h-10 w-3/4 rounded mb-2"></div>
            <div className="shimmer h-4 w-1/4 rounded mb-6"></div>
            
            <div className="flex space-x-4 mb-6">
              <div className="shimmer h-8 w-24 rounded"></div>
              <div className="shimmer h-8 w-24 rounded"></div>
            </div>
            
            <div className="space-y-2 mb-8">
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-2/3 rounded"></div>
            </div>
            
            {/* Color options skeleton */}
            <div className="space-y-3 mb-6">
              <div className="shimmer h-5 w-20 rounded"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="shimmer h-10 w-16 rounded-full"></div>
                ))}
              </div>
            </div>
            
            {/* Size options skeleton */}
            <div className="space-y-3 mb-6">
              <div className="shimmer h-5 w-20 rounded"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="shimmer h-10 w-10 rounded-full"></div>
                ))}
              </div>
            </div>
            
            {/* Add to cart buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="shimmer h-12 flex-1 rounded-full"></div>
              <div className="shimmer h-12 w-12 rounded-full"></div>
              <div className="shimmer h-12 w-12 rounded-full"></div>
            </div>
            
            {/* Tabs skeleton */}
            <div className="pt-6 border-t">
              <div className="flex border-b mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="shimmer h-10 w-24 mx-2 rounded"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="shimmer h-4 w-full rounded"></div>
                <div className="shimmer h-4 w-full rounded"></div>
                <div className="shimmer h-4 w-3/4 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products skeleton */}
        <div className="mt-16">
          <div className="shimmer h-8 w-64 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="shimmer w-full aspect-[3/4] rounded-lg mb-4"></div>
                <div className="shimmer h-5 w-3/4 rounded mb-2"></div>
                <div className="shimmer h-4 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
