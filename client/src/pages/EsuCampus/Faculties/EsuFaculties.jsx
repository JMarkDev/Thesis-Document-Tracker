import { useEffect, useState } from "react";
import FacultyTable from "../../../components/table/FacultyTable";
import { IoSearch } from "react-icons/io5";

import {
  fetchFaculty,
  getRoleStatus,
  getRoleUsers,
  searchFacultyRole,
} from "../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const EsuFaculties = () => {
  const dispatch = useDispatch();
  const facultyUser = useSelector(getRoleUsers("faculty"));
  const registrarStatus = useSelector(getRoleStatus("faculty"));
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (registrarStatus === "idle") {
      dispatch(fetchFaculty());
    }
  }, [registrarStatus, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchFacultyRole(searchTerm));
    } else {
      dispatch(fetchFaculty());
    }
  }, [searchTerm, dispatch]);

  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-end lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full  items-center relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <div>
          <div className="flex justify-end items-center gap-3">
            {/* <button
              // onClick={openModal}
              className="w-fit p-2 px-6  rounded-lg bg-main hover:bg-main_hover text-white font-semi"
            >
              Add Faculty
            </button> */}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <FacultyTable fetchFaculty={facultyUser} />
      </div>
    </div>
  );
};

export default EsuFaculties;
