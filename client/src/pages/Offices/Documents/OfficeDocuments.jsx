import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/DocumentTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../constants/Campus";
// import Status from "../../../components/dropdown/Status";
import Pagination from "../../../components/Pagination";
import {
  fetchAllDocuments,
  getAllDocuments,
  getStatus,
  searchDocument,
  filterDocumentsByESU,
  filterDocumentByType,
  // filterDocumentByStatus,
  sortDocuments,
} from "../../../services/documentSlice";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../../services/documentWolkflowSlice";
import { getUserData } from "../../../services/authSlice";
// import rolesList from "../../../constants/rolesList";

const OfficeDocuments = () => {
  const dispatch = useDispatch();
  const allDocuments = useSelector(getAllDocuments);
  const workflow = useSelector(getAllWorkflow);
  const status = useSelector(getStatus);
  const user = useSelector(getUserData);
  const [documentType, setDocumentType] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [officeDocuments, setOfficeDocuments] = useState([]);
  // const [updatedDocumentList, setUpdatedDocumentList] = useState([]);

  const documentsPerPage = 5;

  useEffect(() => {
    if (allDocuments) {
      const filterByOffice = allDocuments?.filter((document) =>
        document.document_recipients.some(
          (recipient) => recipient.office_name === user?.office.officeName
        )
      );
      setOfficeDocuments(filterByOffice);
    }
  }, [allDocuments, user]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDocuments());
      dispatch(fetchAllWorkflow());
    }
  }, [status, dispatch]);

  const handleFilterByESU = (esu) => {
    if (esu === "WMSU-ESU CAMPUS") {
      dispatch(fetchAllDocuments());
    } else {
      dispatch(filterDocumentsByESU(esu));
    }
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDocument(searchTerm));
    } else {
      dispatch(fetchAllDocuments());
    }
  }, [searchTerm, dispatch]);

  const handleFilterByType = (type) => {
    if (type === "Document Type") {
      dispatch(fetchAllDocuments());
    } else {
      dispatch(filterDocumentByType(type));
    }
  };

  const handleSort = (sortBy) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortDocuments({ sortBy, order: newOrder }));
  };

  useEffect(() => {
    if (workflow) {
      const formattedDocumentTypes = workflow?.map((type) => {
        return type.document_type; // Split by spave and the take the first part
      });

      setDocumentType(formattedDocumentTypes);
    }
  }, [workflow]);

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = officeDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="flex  xl:flex-row flex-col gap-5 justify-between mb-5">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col gap-5">
          <div className=" flex lg:w-[450px] max-w-[450px] w-full  items-center relative">
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
                handleFilter={handleFilterByESU}
                data={wmsuCampus}
                option={"WMSU-ESU CAMPUS"}
              />
            </div>
            <div>
              <Dropdown
                handleFilter={handleFilterByType}
                data={documentType}
                option={"Document Type"}
              />
            </div>
          </div>
        </div>
      </div>
      <Table documents={currentDocuments} handleSort={handleSort} />

      <div className="flex justify-end mt-5">
        <Pagination
          documentsPerPage={documentsPerPage}
          totalDocuments={officeDocuments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default OfficeDocuments;
