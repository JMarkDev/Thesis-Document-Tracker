import { IoMdArrowRoundBack } from "react-icons/io";
const button = () => {
  return (
    <button className="bg-gray-500 hover:bg-gray-600 flex items-center gap-2 rounded-lg px-4 py-2 text-white">
      <IoMdArrowRoundBack />
      Back
    </button>
  );
};

export default button;
