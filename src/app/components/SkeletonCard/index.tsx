export const SkeletonCard = () => {
  return (
    <>
      <li className="rounded-lg">
        <div className="flex w-full flex-1 flex-col items-center">
          <div className="w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6">
            <div className="flex flex-col space-y-2">
              <div className="h-2 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-2 w-10/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </div>
        <hr className="mt-2" />
      </li>
    </>
  );
}