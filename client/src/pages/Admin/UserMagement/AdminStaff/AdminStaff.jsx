import { useEffect, useState } from "react";
import AdminTable from "../../../../components/table/AdminTable";
import { IoSearch } from "react-icons/io5";
import AddAdminStaff from "./AddAdminStaff";
import {
  fetchAdmin,
  getRoleUsers,
  getRoleStatus,
  searchAdminRole,
  fetchAdminStaff,
} from "../../../../services/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/Pagination";
import { getUserData } from "../../../../services/authSlice";

const AdminStaff = () => {
  const dispatch = useDispatch();
  const adminUser = useSelector(getRoleUsers("admin"));
  const adminStaff = useSelector(getRoleUsers("admin_staff"));
  const adminStatus = useSelector(getRoleStatus("admin"));
  const adminSfaffStatus = useSelector(getRoleStatus("admin_staff"));
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector(getUserData);
  const [adminList, setAdminList] = useState([]);
  const documentsPerPage = 5;

  useEffect(() => {
    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }
    if (adminSfaffStatus === "idle") {
      dispatch(fetchAdminStaff());
    }
  }, [adminStatus, dispatch, adminSfaffStatus]);

  useEffect(() => {
    setAdminList(adminUser.concat(adminStaff));
  }, [adminUser, adminStaff]);

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

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = adminList.slice(
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
            officeId={user?.office?.id}
          />
        )}
      </div>
      <div className="mt-8">
        <AdminTable adminUser={currentDocuments} />
        <div className="flex justify-end mt-5">
          <Pagination
            documentsPerPage={documentsPerPage}
            totalDocuments={adminUser.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
