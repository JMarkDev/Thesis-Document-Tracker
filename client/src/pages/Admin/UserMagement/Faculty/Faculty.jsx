import { useEffect, useState } from "react";
import FacultyTable from "../../../../components/table/FacultyTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../../constants/Campus";
import {
  // searchFacultyRole,
  searchFaculty,
  filterFacultyByCampus,
  faculty,
  clearUser,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination";
import rolesList from "../../../../constants/rolesList";

const Faculty = () => {
  const dispatch = useDispatch();
  const allFaculty = useSelector(faculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedESU, setSelectedESU] = useState("WMSU-ESU CAMPUS");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  useEffect(() => {
    // return () => {
    dispatch(clearUser());
    // };
  }, [dispatch]);

  const handleFetchFaculty = () => {
    setTimeout(() => {
      dispatch(
        filterFacultyByCampus({
          esuCampus: "WMSU-ESU CAMPUS",
          role: rolesList.faculty,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchFaculty({
          name: searchTerm,
          role: rolesList.faculty,
          esuCampus: "WMSU-ESU CAMPUS",
        })
      );
    } else {
      dispatch(
        filterFacultyByCampus({
          esuCampus: selectedESU,
          role: rolesList.faculty,
        })
      );
    }
  }, [searchTerm, selectedESU, dispatch]);

  const handleFilter = (esu) => {
    setSelectedESU(esu);
    dispatch(
      filterFacultyByCampus({ esuCampus: esu, role: rolesList.faculty })
    );
  };

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = allFaculty?.slice(
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
              option={"WMSU-ESU CAMPUS"}
              handleFilter={handleFilter}
            />
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
            totalDocuments={allFaculty.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Faculty;
