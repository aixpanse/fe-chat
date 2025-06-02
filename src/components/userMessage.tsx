export default function UserMessage(props: { message: string }) {
  return (
    <div className="w-[75%] bg-[#373345] text-white rounded-xl p-4 mr-0 ml-[25%] my-3 text-sm leading-tight">
      {props.message}
    </div>
  );
}
