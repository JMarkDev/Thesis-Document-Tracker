import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortSubmittedDocuments,
  fetchDocumentsByUserId,
  getAllDocumentsByUserId,
} from "../../../services/documentSlice";
import { getUserData } from "../../../services/authSlice";
import { IoSearch } from "react-icons/io5";
import DrowdownStatus from "../../../components/dropdown/Status";
import DocumentTable from "../../../components/table/DocumentTable";
const AllDocuments = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const user_id = user?.id;
  const [documentList, setDocumentList] = useState([]);
  const documents = useSelector(getAllDocumentsByUserId);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (user_id) {
      dispatch(fetchDocumentsByUserId(user_id));
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    if (documents) {
      setDocumentList(documents);
    }
  }, [documents]);

  const handleSort = (sortBy) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortSubmittedDocuments({ sortBy, order: newOrder, user_id }));
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  lg:flex-row gap-5 flex-col justify-between">
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
        <div className="flex items-center justify-end gap-3">
          <span className="text-gray-700">Filter documents by:</span>
          <DrowdownStatus />
        </div>
      </div>
      <DocumentTable documents={documentList} handleSort={handleSort} />
    </div>
  );
  //   <div className="flex flex-col gap-5 justify-center">
  //   <h2 className="text-3xl font-semibold text-gray-800 text-center">
  //     Document not found
  //   </h2>
  //   <img
  //     src={noDataIMG}
  //     alt="No data available"
  //     className="w-64 h-64"
  //   />
  // </div>
};

export default AllDocuments;
