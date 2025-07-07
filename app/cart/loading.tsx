export default function Loading() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="shimmer h-10 w-48 rounded mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6 border-b border-gray-200 pb-6">
                <div className="shimmer w-24 h-24 rounded"></div>
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between">
                    <div className="shimmer h-6 w-40 rounded"></div>
                    <div className="shimmer h-6 w-6 rounded-full"></div>
                  </div>
                  <div className="shimmer h-4 w-32 rounded"></div>
                  <div className="flex justify-between items-center">
                    <div className="shimmer h-9 w-28 rounded"></div>
                    <div className="shimmer h-6 w-16 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order summary skeleton */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="shimmer h-6 w-40 rounded mb-6"></div>
              
              <div className="space-y-3 mb-6">
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
                <div className="pt-3 mt-3 border-t">
                  <div className="flex justify-between">
                    <div className="shimmer h-5 w-16 rounded"></div>
                    <div className="shimmer h-5 w-20 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="shimmer h-12 w-full rounded-full"></div>
                <div className="shimmer h-12 w-full rounded-full"></div>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="shimmer h-4 w-32 rounded"></div>
                <div className="flex gap-2">
                  <div className="shimmer h-8 w-16 rounded"></div>
                  <div className="shimmer h-8 w-20 rounded"></div>
                  <div className="shimmer h-8 w-16 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
