import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/TransmittalTable";
import { IoSearch } from "react-icons/io5";
import Paganation from "../../../components/Paganation";
import {
  fetchAllDocuments,
  getAllDocuments,
  getStatus,
  searchDocument,
  sortDocuments,
} from "../../../services/documentSlice";

const EsuTransmittal = () => {
  const dispatch = useDispatch();
  const allDocuments = useSelector(getAllDocuments);
  const status = useSelector(getStatus);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDocuments());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDocument(searchTerm));
    } else {
      dispatch(fetchAllDocuments());
    }
  }, [searchTerm, dispatch]);

  const handleSort = (sortBy) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortDocuments({ sortBy, order: newOrder }));
  };

  return (
    <div className="">
      <div className="flex  flex-col gap-5 justify-between mb-8">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col gap-5">
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
          <button
            // to={"/upload-documents"}
            className="w-fit p-2 flex items-center text-center px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
          >
            Generate Transmittal
          </button>
        </div>
      </div>
      <Table documents={allDocuments} handleSort={handleSort} />
      <div className="flex justify-end mt-10">
        <Paganation />
      </div>
    </div>
  );
};

export default EsuTransmittal;
