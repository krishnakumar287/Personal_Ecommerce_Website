export default function Loading() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="shimmer h-10 w-48 rounded mb-8"></div>
        
        {/* Progress indicator skeleton */}
        <div className="mb-12">
          <div className="flex justify-between max-w-lg mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="shimmer w-10 h-10 rounded-full mb-2"></div>
                <div className="shimmer h-4 w-20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form skeleton */}
          <div className="lg:col-span-2">
            <div className="shimmer h-8 w-56 rounded mb-6"></div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <div className="shimmer h-5 w-32 rounded mb-2"></div>
                    <div className="shimmer h-12 w-full rounded"></div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <div className="shimmer h-5 w-32 rounded mb-2"></div>
                    <div className="shimmer h-12 w-full rounded"></div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="shimmer h-5 w-32 rounded mb-2"></div>
                <div className="shimmer h-12 w-full rounded"></div>
              </div>
              
              <div>
                <div className="shimmer h-5 w-48 rounded mb-2"></div>
                <div className="shimmer h-12 w-full rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="shimmer h-5 w-24 rounded mb-2"></div>
                    <div className="shimmer h-12 w-full rounded"></div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="shimmer h-5 w-32 rounded mb-2"></div>
                <div className="shimmer h-12 w-full rounded"></div>
              </div>
              
              <div className="pt-4">
                <div className="shimmer h-12 w-full rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Order summary skeleton */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="shimmer h-6 w-40 rounded mb-6"></div>
              
              <div className="space-y-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shimmer w-16 h-16 rounded"></div>
                    <div className="flex-1 space-y-1">
                      <div className="shimmer h-4 w-32 rounded"></div>
                      <div className="shimmer h-3 w-24 rounded"></div>
                      <div className="flex justify-between">
                        <div className="shimmer h-3 w-16 rounded"></div>
                        <div className="shimmer h-3 w-16 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <div className="shimmer h-4 w-20 rounded"></div>
                  <div className="shimmer h-4 w-16 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="shimmer h-4 w-20 rounded"></div>
                  <div className="shimmer h-4 w-16 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="shimmer h-4 w-20 rounded"></div>
                  <div className="shimmer h-4 w-16 rounded"></div>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <div className="shimmer h-5 w-16 rounded"></div>
                    <div className="shimmer h-5 w-20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
