import { useEffect, useState } from "react";
import RegistrarTable from "../../../../components/table/RegistrarTable";
import { IoSearch } from "react-icons/io5";
import AddCampusAdmin from "./AddCampusAdmin";
import {
  fetchCampusAdmin,
  getCampusAdminStatus,
  getCampusAdminUsers,
  searchCampusAdminRole,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const CampusAdmin = () => {
  const dispatch = useDispatch();
  const campusAdminUsers = useSelector(getCampusAdminUsers);
  const campusAdminStatus = useSelector(getCampusAdminStatus);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (campusAdminStatus === "idle") {
      dispatch(fetchCampusAdmin());
    }
  }, [campusAdminStatus, dispatch]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (modal) => {
    setShowModal(modal);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchCampusAdminRole(searchTerm));
    } else {
      dispatch(fetchCampusAdmin());
    }
  }, [searchTerm, dispatch]);

  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full  items-center relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <button
          onClick={openModal}
          className="w-fit p-2 px-6 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add Campus Admin
        </button>
        {showModal && (
          <AddCampusAdmin
            modal={openModal}
            closeModal={closeModal}
            showModal={showModal}
          />
        )}
      </div>
      <div className="mt-8">
        <RegistrarTable registrarUser={campusAdminUsers} />
      </div>
    </div>
  );
};

export default CampusAdmin;
