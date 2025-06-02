export function OrderIcon({
  newOrder,
  onClick,
}: {
  newOrder: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative m-4 flex p-[4px] hover:bg-gray-300 justify-items-start rounded-full   active:bg-[#373345] ${
        newOrder && "animate-bounce"
      }`}
    >
      <svg
        className="w-[26px] h-[26px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="gray"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
        />
      </svg>
      {newOrder && (
        <span className="absolute flex size-3 ml-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
        </span>
      )}
    </div>
  );
}
