const ScanNow = () => {
  return (
    <div className="w-full ">
      <div>
        <input
          type="text"
          placeholder="Enter Tracking Number"
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex mt-4 bg-gray-300 justify-center items-center h-[calc(100vh-140px)]  cursor-pointer">
        <button className="bg-main text-white px-10 py-2 rounded-lg">
          Scan Now
        </button>
      </div>
    </div>
  );
};

export default ScanNow;
