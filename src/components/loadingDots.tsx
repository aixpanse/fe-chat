export function LoadingDots() {
  return (
    <div className="flex space-x-1 items-center">
      <div className="h-2 w-2 bg-[#373345] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-[#373345] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-[#373345] rounded-full animate-bounce"></div>
    </div>
  );
}
