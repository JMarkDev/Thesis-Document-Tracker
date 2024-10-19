import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortSubmittedDocuments,
  fetchDocumentsByUserId,
  getAllDocumentsByUserId,
  searchDocumentByUserId,
  // filterUserDocuments,
} from "../../../services/documentSlice";
import { getUserData } from "../../../services/authSlice";
import { IoSearch } from "react-icons/io5";
// import DrowdownStatus from "../../../components/dropdown/Status";
import DocumentTable from "../../../components/table/DocumentTable";
import Pagination from "../../../components/Pagination";
import rolesList from "../../../constants/rolesList";

const AllDocuments = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const user_id = user?.id;
  const [documentList, setDocumentList] = useState([]);
  const documents = useSelector(getAllDocumentsByUserId);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  // const [status, setStatus] = useState("");
  const [updatedDocumentList, setUpdatedDocumentList] = useState([]);

  const documentsPerPage = 7;

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
    dispatch(
      sortSubmittedDocuments({
        sortBy,
        order: newOrder,
        user_id,
        esuCampus: null,
      })
    );
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDocumentByUserId({ name: searchTerm, user_id }));
    } else {
      dispatch(fetchDocumentsByUserId(user_id));
    }
  }, [searchTerm, dispatch, user_id]);

  // const handleFilter = (status) => {
  //   if (status === "Status") {
  //     dispatch(fetchDocumentsByUserId(user_id));
  //   } else {
  //     dispatch(filterUserDocuments({ status, user_id }));
  //   }
  // };

  // useEffect(() => {
  //   const updateDocumentStatuses = () => {
  //     const updatedDocumentList = documentList.map((document) => {
  //       // Check if all recipients have received the document
  //       const allReceived = document?.document_recipients.every(
  //         (recipient) => recipient.received_at !== null
  //       );

  //       // Find the current office and check if it has received the document
  //       const officeReceived = document?.document_recipients.find(
  //         (recipient) =>
  //           recipient.office_name === user.office?.officeName &&
  //           recipient.received_at !== null
  //       );

  //       // Get the previous office recipient to compare the time difference
  //       const previousRecipient = document?.document_recipients.find(
  //         (recipient) =>
  //           recipient.office_name !== user.office?.officeName &&
  //           recipient.received_at !== null
  //       );

  //       // Initialize status as "Incoming"
  //       let status = "Incoming";

  //       // Check if the previous office has received the document
  //       if (previousRecipient) {
  //         const receivedAt = new Date(previousRecipient.received_at);
  //         const currentTime = new Date();

  //         // Check if the time difference exceeds 24 hours (86400000 milliseconds)
  //         const timeDifference = currentTime - receivedAt;

  //         if (timeDifference > 86400000 && !officeReceived && !allReceived) {
  //           status = "Delayed";
  //         }
  //       }

  //       if (allReceived) {
  //         status = "Completed";
  //       } else if (!allReceived && user?.role === rolesList.faculty) {
  //         status = "In Progress"; // Default status if not all are received
  //       } else if (officeReceived) {
  //         status = "Received";
  //       }

  //       // Only return the updated document if the status has changed
  //       if (document.status !== status) {
  //         return {
  //           ...document,
  //           status,
  //         };
  //       }

  //       return document; // No change in status, return the same document
  //     });

  //     // Only update the state if the document list has changed
  //     if (
  //       JSON.stringify(updatedDocumentList) !== JSON.stringify(documentList)
  //     ) {
  //       setUpdatedDocumentList(updatedDocumentList);
  //     }
  //     console.log(updatedDocumentList);
  //   };

  //   updateDocumentStatuses();
  // }, [documentList, user]); // Add proper dependencies

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documentList.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex  lg:flex-row gap-5 flex-col justify-end">
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
        {/* <div className="flex items-center justify-end gap-3">
          <span className="text-gray-700">Filter documents by:</span>
          <DrowdownStatus handleFilter={handleFilter} />
        </div> */}
      </div>
      <DocumentTable documents={currentDocuments} handleSort={handleSort} />
      <div className="flex justify-end">
        <Pagination
          documentsPerPage={documentsPerPage}
          totalDocuments={documentList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AllDocuments;
