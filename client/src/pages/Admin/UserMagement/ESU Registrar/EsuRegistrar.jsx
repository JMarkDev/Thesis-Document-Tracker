import { useEffect, useState } from "react";
import RegistrarTable from "../../../../components/table/RegistrarTable";
import { IoSearch } from "react-icons/io5";
import AddEsuRegistrar from "./AddEsuRegistrar";
import {
  clearUser,
  filterFacultyByCampus,
  searchFaculty,
  faculty,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination";
import Dropdown from "../../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../../constants/Campus";
import rolesList from "../../../../constants/rolesList";

const EsuRegistrar = () => {
  const dispatch = useDispatch();
  const registrarUser = useSelector(faculty);
  // const registrarStatus = useSelector(getRoleStatus("registrar"));
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedESU, setSelectedESU] = useState("WMSU-ESU CAMPUS");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  useEffect(() => {
    // return () => {
    dispatch(clearUser());
    // };
  }, [dispatch]);

  const handleFetchUpdate = () => {
    setTimeout(() => {
      dispatch(
        filterFacultyByCampus({
          esuCampus: "WMSU-ESU CAMPUS",
          role: rolesList.registrar,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    dispatch(
      filterFacultyByCampus({
        esuCampus: selectedESU,
        role: rolesList.registrar,
      })
    );
  }, [dispatch, selectedESU]);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (modal) => {
    setShowModal(modal);
  };
  const handleFilterByESU = (esu) => {
    setSelectedESU(esu);
    dispatch(
      filterFacultyByCampus({
        esuCampus: esu,
        role: rolesList.registrar,
      })
    );
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchFaculty({
          name: searchTerm,
          role: rolesList.registrar,
          esuCampus: "WMSU-ESU CAMPUS",
        })
      );
    } else {
      dispatch(
        filterFacultyByCampus({
          esuCampus: selectedESU,
          role: rolesList.registrar,
        })
      );
    }
  }, [searchTerm, dispatch, selectedESU]);

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = registrarUser?.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex text-sm md:text-[16px]  justify-between lg:flex-row flex-col gap-5">
        <button
          onClick={openModal}
          className="w-fit p-2 px-6 h-fit rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add ESU Registrar
        </button>
        {/* <div className="flex flex-col gap-3"> */}
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
        {/* <div>
            <Dropdown
              handleFilter={handleFilterByESU}
              data={wmsuCampus}
              option={"WMSU-ESU CAMPUS"}
            />
          </div> */}
        {/* </div> */}

        {showModal && (
          <AddEsuRegistrar
            modal={openModal}
            closeModal={closeModal}
            showModal={showModal}
            handleFetchUpdate={handleFetchUpdate}
          />
        )}
      </div>
      <div className="mt-3">
        <Dropdown
          handleFilter={handleFilterByESU}
          data={wmsuCampus}
          option={"WMSU-ESU CAMPUS"}
        />
      </div>
      <div className="mt-8">
        <RegistrarTable
          registrarUser={currentDocuments}
          handleFetchUpdate={handleFetchUpdate}
        />

        <div className="flex justify-end mt-5">
          <Pagination
            documentsPerPage={documentsPerPage}
            totalDocuments={registrarUser?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default EsuRegistrar;
