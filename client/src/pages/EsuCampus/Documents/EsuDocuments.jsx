// const EsuDocuments = () => {
//   return <div>EsuDocuments</div>;
// };

// export default EsuDocuments;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/DocumentTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../components/dropdown/Dropdown";
// import Status from "../../../components/dropdown/Status";
import Pagination from "../../../components/Pagination";
import {
  getAllDocumentsByUserId,
  getStatus,
  // filterDocumentByStatus,
  sortSubmittedDocuments,
  filterDocumentsByESU,
  filterAllDocuments,
  getFilteredDocuments,
} from "../../../services/documentSlice";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../../services/documentWolkflowSlice";
import { Link } from "react-router-dom";
import { getUserData } from "../../../services/authSlice";
// import rolesList from "../../../constants/rolesList";

const Documents = () => {
  const dispatch = useDispatch();
  const documents = useSelector(getFilteredDocuments);
  const sorted = useSelector(getAllDocumentsByUserId);
  const workflow = useSelector(getAllWorkflow);
  const status = useSelector(getStatus);
  const [documentType, setDocumentType] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(getUserData);
  const [documentData, setDocumentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("");
  // const [updatedDocumentList, setUpdatedDocumentList] = useState([]);

  const documentsPerPage = 5;

  useEffect(() => {
    if (documents) {
      setDocumentData(documents);
    }
  }, [documents]);

  useEffect(() => {
    dispatch(
      filterAllDocuments({
        document_type: type,
        esuCampus: user?.esuCampus,
        startDate: "",
        endDate: "",
        uploaded_by: "",
        name: searchTerm,
      })
    );
  }, [dispatch, searchTerm, user, type]);

  useEffect(() => {
    if (workflow) {
      const formattedDocumentTypes = workflow?.map((type) => {
        return type.document_type; // Split by spave and the take the first part
      });

      setDocumentType(formattedDocumentTypes);
    }
  }, [workflow]);

  useEffect(() => {
    if (sorted) {
      setDocumentData(sorted);
    }
  }, [sorted]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllWorkflow());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(filterDocumentsByESU(user?.esuCampus));
    }
  }, [user, dispatch]);

  const handleFilterByType = (type) => {
    if (type === "Document Type") {
      setType("");
    } else {
      setType(type);
    }
  };

  const handleSort = (sortBy) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(
      sortSubmittedDocuments({
        sortBy,
        order: newOrder,
        user_id: null,
        esuCampus: user?.esuCampus,
      })
    );
  };

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documentData.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="flex  flex-col gap-5 justify-between mb-5">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col gap-5">
          <Link
            to={"/upload-documents"}
            className="w-fit p-2 flex items-center text-center px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
          >
            Upload Documents
          </Link>
          <div className=" flex max-w-[450px] w-full  items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <IoSearch className="text-2xl absolute right-2 text-gray-600" />
          </div>
        </div>

        <div className="flex sm:justify-end justify-center flex-col lg:flex-row lg:items-center items-end  gap-3">
          <span className="text-gray-700">Filter documents by:</span>
          <div className="flex items-center gap-3">
            <div>
              <Dropdown
                handleFilter={handleFilterByType}
                data={documentType}
                option={"Document Type"}
              />
            </div>

            {/* <div>
              <Status handleFilter={handleFIlterByStatus} />
            </div> */}
          </div>
        </div>
      </div>
      <Table documents={currentDocuments} handleSort={handleSort} />
      <div className="flex justify-end mt-5">
        <Pagination
          documentsPerPage={documentsPerPage}
          totalDocuments={documentData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Documents;
