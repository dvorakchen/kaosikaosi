export function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-20 bg-base-300/50
          flex place-content-center"
          ></div>
          <span className="sticky top-[40%] left-1/2 z-20 loading loading-spinner loading-lg text-primary"></span>
        </>
      )}
    </>
  );
}
