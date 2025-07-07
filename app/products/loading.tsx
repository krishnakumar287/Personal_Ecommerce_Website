export default function Loading() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="shimmer h-10 w-48 rounded mb-4 md:mb-0"></div>
          <div className="shimmer h-10 w-32 rounded"></div>
        </div>

        {/* Filters and products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-8">
                <div className="shimmer h-6 w-32 rounded mb-4"></div>
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="shimmer h-4 w-full rounded mb-3"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Products grid skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <div className="shimmer w-full aspect-[3/4] rounded-lg mb-4"></div>
                  <div className="shimmer h-5 w-3/4 rounded mb-2"></div>
                  <div className="shimmer h-4 w-1/2 rounded mb-2"></div>
                  <div className="shimmer h-4 w-1/4 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}