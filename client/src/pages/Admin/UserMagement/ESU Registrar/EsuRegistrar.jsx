import { useEffect, useState } from "react";
import RegistrarTable from "../../../../components/table/RegistrarTable";
import { IoSearch } from "react-icons/io5";
import AddEsuRegistrar from "./AddEsuRegistrar";
import {
  fetchRegistrar,
  getRegistrarStatus,
  getRegistrarUsers,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const EsuRegistrar = () => {
  const dispatch = useDispatch();
  const registrarUser = useSelector(getRegistrarUsers);
  const registrarStatus = useSelector(getRegistrarStatus);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (registrarStatus === "idle") {
      dispatch(fetchRegistrar());
    }
  }, [registrarStatus, dispatch]);

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
          className="w-fit p-2 px-6 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add ESU Registrar
        </button>
        {showModal && (
          <AddEsuRegistrar
            modal={openModal}
            closeModal={closeModal}
            showModal={showModal}
          />
        )}
      </div>
      <div className="mt-8">
        <RegistrarTable registrarUser={registrarUser} />
      </div>
    </div>
  );
};

export default EsuRegistrar;
