export function LoginIcon({
  onClick,
  isLoggedIn,
}: {
  onClick?: () => void;
  isLoggedIn: boolean;
}) {
  return (
    <div className="relative m-4 flex justify-items-start" onClick={onClick}>
      <svg
        className="w-[30px] h-[30px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill={isLoggedIn ? "#373345" : "gray"}
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
          clipRule="evenodd"
        />
      </svg>

      {isLoggedIn && (
        <span className="absolute flex size-3 ml-5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-green-600"></span>
        </span>
      )}
    </div>
  );
}
