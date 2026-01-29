export function ComboCardSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="
          flex flex-col h-full
          bg-black/40 backdrop-blur-md rounded-2xl
          border-2 border-gray-700
          p-6 animate-pulse
        "
      >
        {/* Title skeleton */}
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto" />
        </div>

        {/* Price skeleton */}
        <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-4" />

        {/* Button skeleton */}
        <div className="h-10 bg-gray-700 rounded-full w-full" />
      </div>
    </div>
  );
}

export function ComboGridSkeleton() {
  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ComboCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
