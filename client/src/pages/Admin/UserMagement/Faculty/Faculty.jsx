import { useEffect, useState } from "react";
import FacultyTable from "../../../../components/table/FacultyTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../../constants/Campus";
import {
  fetchFaculty,
  // getFacultyStatus,
  getRoleStatus,
  getRoleUsers,
  searchFacultyRole,
  filterFacultyByCampus,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination";

const Faculty = () => {
  const dispatch = useDispatch();
  const facultyUser = useSelector(getRoleUsers("faculty"));
  const registrarStatus = useSelector(getRoleStatus("faculty"));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedESU, setSelectedESU] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  useEffect(() => {
    if (registrarStatus === "idle") {
      dispatch(fetchFaculty());
    }
  }, [registrarStatus, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchFacultyRole(searchTerm));
    } else if (selectedESU && selectedESU !== "WMSU-ESU-CAMPUS") {
      dispatch(filterFacultyByCampus(selectedESU));
    } else {
      dispatch(fetchFaculty());
    }
  }, [searchTerm, selectedESU, dispatch]);

  const handleFilter = (esu) => {
    setSelectedESU(esu);
  };

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
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
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
            <span className="text-gray-700 text-sm w-fit text-nowrap">
              Filter faculty by:
            </span>
            <Dropdown
              data={wmsuCampus}
              option={"WMSU-ESU-CAMPUS"}
              handleFilter={handleFilter}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <FacultyTable fetchFaculty={currentDocuments} />
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

export default Faculty;
