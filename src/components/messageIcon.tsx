export function MessageIcon({
  newMessage,
  onClick,
}: {
  newMessage: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative m-4 flex p-[4px] justify-items-start hover:bg-gray-300 rounded-full active:bg-[#373345] ${
        newMessage && "animate-bounce"
      }`}
    >
      <svg
        className={`w-[26px] h-[26px] text-gray-800 dark:text-white`}
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
          strokeWidth="2"
          d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>
      {newMessage && (
        <span className="absolute flex size-3 ml-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
        </span>
      )}
    </div>
  );
}
