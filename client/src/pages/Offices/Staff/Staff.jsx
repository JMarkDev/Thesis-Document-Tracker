import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import AddStaff from "./AddStaff";
import { searchOfficeRole } from "../../../services/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../services/authSlice";
import OfficeStaff from "../../../components/table/OfficeStaff";
import {
  getStaff,
  fetchStaff,
  staffStatus,
} from "../../../services/staffSlice";
const Staff = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [officeStaff, setOfficeStaff] = useState([]);
  const staff = useSelector(getStaff);
  const status = useSelector(staffStatus);

  useEffect(() => {
    if (staffStatus === "idle") {
      dispatch(fetchStaff(user.office?.id));
    }
  }, [user, dispatch]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (modal) => {
    setShowModal(modal);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchOfficeRole(searchTerm));
    } else {
      dispatch(fetchStaff(user.office?.id));
    }
  }, [searchTerm, user, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setOfficeStaff(staff);
    }
  }, [staff, user, status, dispatch]);

  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full  items-center relative">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <button
          onClick={openModal}
          className="w-fit p-2 px-6  rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add Staff
        </button>
        {showModal && (
          <AddStaff
            modal={openModal}
            closeModal={closeModal}
            officeId={user.office?.id}
          />
        )}
      </div>
      <div className="mt-8">
        <OfficeStaff officeStaff={officeStaff} officeId={user.office?.id} />
      </div>
    </div>
  );
};

export default Staff;
