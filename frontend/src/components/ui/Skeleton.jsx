
const Skeleton = () => {
  return (
    [...Array(4)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 animate-pulse p-5 rounded-lg shadow-md mt-7"
      >
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
      </div>
    ))
  )
}

export default Skeleton
