import { useEffect, useState } from "react";
import AdminTable from "../../../../components/table/AdminTable";
import { IoSearch } from "react-icons/io5";
import AddAdminStaff from "./AddAdminStaff";
import {
  fetchAdmin,
  getRoleUsers,
  getRoleStatus,
  searchAdminRole,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminStaff = () => {
  const dispatch = useDispatch();
  const adminUser = useSelector(getRoleUsers("admin"));
  const adminStatus = useSelector(getRoleStatus("admin"));
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }
  }, [adminStatus, dispatch]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (modal) => {
    setShowModal(modal);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchAdminRole(searchTerm));
    } else {
      dispatch(fetchAdmin());
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
          Add Admin Staff
        </button>
        {showModal && (
          <AddAdminStaff
            modal={openModal}
            closeModal={closeModal}
            showModal={showModal}
          />
        )}
      </div>
      <div className="mt-8">
        <AdminTable adminUser={adminUser} />
      </div>
    </div>
  );
};

export default AdminStaff;
