import { useEffect, useState } from "react";
import FacultyTable from "../../../../components/table/FacultyTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../../utils/Campus";
import {
  fetchFaculty,
  getFacultyStatus,
  getFacultyUsers,
  searchFacultyRole,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const Faculty = () => {
  const dispatch = useDispatch();
  const facultyUser = useSelector(getFacultyUsers);
  const registrarStatus = useSelector(getFacultyStatus);
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
        <div>
          <div className="flex justify-end items-center gap-3">
            <span className="text-gray-700">Filter faculty by:</span>
            <Dropdown data={wmsuCampus} option={"WMSU-ESU-CAMPUS"} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <FacultyTable fetchFaculty={facultyUser} />
      </div>
    </div>
  );
};

export default Faculty;
