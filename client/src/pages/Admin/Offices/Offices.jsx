import { useState, useEffect } from "react";
import OfficeTable from "../../../components/table/OfficeTable";
import { IoSearch } from "react-icons/io5";
import AddOffice from "./AddOffice";
import {
  searchOfficeRole,
  fetchOffice,
  fetchAdmin,
  getRoleUsers,
  getRoleStatus,
} from "../../../services/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../components/Pagination";
const Office = () => {
  const dispatch = useDispatch();
  const officeUsers = useSelector(getRoleUsers("office"));
  const officeStatus = useSelector(getRoleStatus("office"));
  const adminStatus = useSelector(getRoleStatus("admin"));
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  useEffect(() => {
    if (officeStatus === "idle") {
      dispatch(fetchOffice());
    }

    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }
  }, [officeStatus, adminStatus, dispatch]);

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
      dispatch(fetchOffice());
    }
  }, [searchTerm, dispatch]);

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = officeUsers?.slice(
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
          Add Office
        </button>
        {showModal && <AddOffice modal={openModal} closeModal={closeModal} />}
      </div>
      <div className="mt-8">
        <OfficeTable officeUsers={currentDocuments} />
        <div className="flex justify-end mt-5">
          <Pagination
            documentsPerPage={documentsPerPage}
            totalDocuments={officeUsers?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Office;
