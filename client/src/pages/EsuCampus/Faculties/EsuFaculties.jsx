import { useEffect, useState } from "react";
import FacultyTable from "../../../components/table/FacultyTable";
import { IoSearch } from "react-icons/io5";

import {
  getRoleStatus,
  searchFaculty,
  filterFacultyByCampus,
  faculty,
} from "../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../services/authSlice";
import Pagination from "../../../components/Pagination";
import rolesList from "../../../constants/rolesList";

const EsuFaculties = () => {
  const dispatch = useDispatch();
  const facultyUser = useSelector(faculty);
  const registrarStatus = useSelector(getRoleStatus("faculty"));
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(getUserData);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  const handleFetchFaculty = () => {
    setTimeout(() => {
      dispatch(
        filterFacultyByCampus({
          esuCampus: user?.esuCampus,
          role: rolesList.faculty,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    if (registrarStatus === "idle") {
      dispatch(
        filterFacultyByCampus({
          esuCampus: user?.esuCampus,
          role: rolesList.faculty,
        })
      );
    }
  }, [registrarStatus, dispatch, user]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchFaculty({
          name: searchTerm,
          role: rolesList.faculty,
          esuCampus: user?.esuCampus,
        })
      );
    } else {
      dispatch(
        filterFacultyByCampus({
          esuCampus: user?.esuCampus,
          role: rolesList.faculty,
        })
      );
    }
  }, [searchTerm, dispatch, user]);

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = facultyUser.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <FacultyTable
          faculty={currentDocuments}
          handleFetchFaculty={handleFetchFaculty}
        />
        <div className="flex justify-end mt-5">
          <Pagination
            documentsPerPage={documentsPerPage}
            totalDocuments={facultyUser.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default EsuFaculties;
