import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/DocumentTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../components/dropdown/Dropdown";
import wmsuCampus from "../../../constants/Campus";
import Status from "../../../components/dropdown/Status";
import {
  fetchAllDocuments,
  getAllDocuments,
  getStatus,
  searchDocument,
  filterDocumentsByESU,
  filterDocumentByType,
  filterDocumentByStatus,
} from "../../../services/documentSlice";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../../services/documentWolkflowSlice";

const Documents = () => {
  const dispatch = useDispatch();
  const allDocuments = useSelector(getAllDocuments);
  const workflow = useSelector(getAllWorkflow);
  const status = useSelector(getStatus);
  const documentType = ["IDP", "IOR", "DTR"];
  console.log(workflow);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDocuments());
      dispatch(fetchAllWorkflow());
    }
  }, [status, dispatch]);

  const handleFilterByESU = (esu) => {
    if (esu === "WMSU-ESU Campus") {
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
      dispatch(fetchAllDocuments);
    } else {
      dispatch(filterDocumentByType(type));
    }
  };

  const handleFIlterByStatus = (status) => {
    if (status === "Document Status") {
      dispatch(fetchAllDocuments());
    } else {
      dispatch(filterDocumentByStatus(status));
    }
  };

  return (
    <div className="">
      <div className="flex  flex-col gap-5 justify-between mb-8">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col gap-5">
          <button className="w-fit p-2 px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi">
            Upload Documents
          </button>
          <div className=" flex max-w-[450px] w-full  items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100"
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
                option={"WMSU-ESU Campus"}
              />
            </div>
            <div>
              <Dropdown
                handleFilter={handleFilterByType}
                data={documentType}
                option={"Document Type"}
              />
            </div>

            <div>
              <Status handleFilter={handleFIlterByStatus} />
            </div>
          </div>
        </div>
      </div>
      <Table documents={allDocuments} />
    </div>
  );
};

export default Documents;
