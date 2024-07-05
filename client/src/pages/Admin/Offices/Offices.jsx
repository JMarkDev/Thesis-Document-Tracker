import { useState } from "react";
import OfficeTable from "../../../components/table/OfficeTable";
import { IoSearch } from "react-icons/io5";
import AddOffice from "./AddOffice";
const Office = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (modal) => {
    setShowModal(modal);
  };

  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full  items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <button
          onClick={openModal}
          className="w-fit p-2 px-6  rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add Office
        </button>
        {showModal && <AddOffice modal={openModal} closeModal={closeModal} />}
      </div>
      <div className="mt-8">
        <OfficeTable />
      </div>
    </div>
  );
};

export default Office;
