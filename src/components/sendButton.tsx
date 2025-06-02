export function SendButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={() => !disabled && onClick()}
      type="button"
      className="absolute right-6 text-blue-700 hover:bg-gray-300 hover:text-white active:bg-[#373345] focus:outline-none rounded-full text-sm p-2 text-center inline-flex items-center"
    >
      <svg
        className="w-5 h-5 rotate-90 rtl:-rotate-90 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={disabled ? "gray" : "#373345"}
        viewBox="0 0 18 20"
      >
        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
      </svg>
    </button>
  );
}
