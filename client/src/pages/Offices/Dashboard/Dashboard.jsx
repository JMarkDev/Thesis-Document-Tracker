import Cards from "../../../components/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YearDropdown from "../../../components/dropdown/YearDropdown";

import {
  adminAnalytics,
  fetchDataEsuByYear,
  fetchDataByDocumentType,
  fetchDataOfficeByYear,
} from "../../../services/analyticsSlice";
import { getUserData } from "../../../services/authSlice";
import {
  fetchAllDocuments,
  getAllDocuments,
  filterDocumentsByESU,
} from "../../../services/documentSlice";
import rolesList from "../../../constants/rolesList";
import StatusPieChart from "../../../components/charts/StatusPieChart";
import LineChartDocumentSubmissions from "../../../components/charts/LineChartDocumentSubmissions";

const OfficeDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const [cardData, setCardData] = useState([]);
  const [officeRecipient, setOfficeRecipient] = useState("");
  const [updatedDocumentList, setUpdatedDocumentList] = useState([]);
  const documents = useSelector(getAllDocuments);
  const [statusData, setStatusData] = useState([]);
  const [esuCampus, setEsuCampus] = useState("");
  const [fullName, setFullName] = useState("");
  const normalizeString = (str) => str?.trim().replace(/\./g, "").toLowerCase();
  const [officeDocuments, setOfficeDocuments] = useState([]);

  useEffect(() => {
    if (documents) {
      const filterByOffice = documents?.filter((document) =>
        document.document_recipients.some(
          (recipient) => recipient.office_name === user?.office.officeName
        )
      );
      setOfficeDocuments(filterByOffice);
    }
  }, [documents, user]);

  useEffect(() => {
    dispatch(adminAnalytics());
    dispatch(
      fetchDataEsuByYear({
        esuCampus: `${user?.esuCampus}`,
        year: new Date().getFullYear(),
      })
    );
    dispatch(filterDocumentsByESU(user?.esuCampus));
    dispatch(fetchAllDocuments());
    dispatch(fetchDataByDocumentType());
    dispatch(
      fetchDataOfficeByYear({
        officeName: user?.office.officeName,
        year: new Date().getFullYear(),
      })
    );

    if (user) {
      setEsuCampus(user?.esuCampus);
      setOfficeRecipient(user.office?.officeName);
      setFullName(`${user?.firstName} ${user.middleInitial} ${user?.lastName}`);
    }
  }, [dispatch, user, esuCampus]);

  const filterByYear = (selected) => {
    dispatch(
      fetchDataEsuByYear({
        esuCampus: `${user?.esuCampus}`,
        year: selected,
      })
    );
  };

  // console.log(documents);

  useEffect(() => {
    const updateDocumentStatuses = () => {
      const updatedDocumentList = officeDocuments.map((document) => {
        // Check if all recipients have received the document
        const allReceived = document?.document_recipients.every(
          (recipient) => recipient.received_at !== null
        );

        // Find the current office and check if it has received the document
        const officeReceived = document?.document_recipients.find(
          (recipient) =>
            normalizeString(recipient.office_name) ===
              normalizeString(officeRecipient) && recipient.received_at !== null
        );

        // Get the previous office recipient to compare the time difference
        const previousRecipient = document?.document_recipients.find(
          (recipient) =>
            recipient.office_name !== officeRecipient &&
            recipient.received_at !== null
        );

        // Initialize status as "Incoming"
        let status = "Incoming";
        let isDelayed = false;

        // Check if the previous office has received the document
        if (previousRecipient) {
          const receivedAt = new Date(previousRecipient.received_at);
          const currentTime = new Date();

          // Check if the time difference exceeds 24 hours (86400000 milliseconds)
          const timeDifference = currentTime - receivedAt;

          if (timeDifference > 86400000 && !officeReceived && !allReceived) {
            isDelayed = true;
          }
        }

        if (allReceived) {
          status = "Completed";
        } else if (isDelayed && !officeReceived && !allReceived) {
          status = "Delayed";
        } else if (!allReceived && user?.role === rolesList.faculty) {
          status = "In Progress"; // Default status if not all are received
        } else if (officeReceived) {
          status = "Received";
        } else if (
          normalizeString(fullName) === normalizeString(document.uploaded_by)
        ) {
          status = "Uploaded";
        }

        // Only return the updated document if the status has changed
        if (document.status !== status) {
          return {
            ...document,
            status,
          };
        }

        return document; // No change in status, return the same document
      });

      // Only update the state if the document list has changed
      if (
        JSON.stringify(updatedDocumentList) !== JSON.stringify(officeDocuments)
      ) {
        setUpdatedDocumentList(updatedDocumentList);
      }
    };

    updateDocumentStatuses();
  }, [officeDocuments, user, officeRecipient, fullName]); // Add proper dependencies

  useEffect(() => {
    const statusList = [
      { title: "Received Documents", status: "Received" },
      { title: "Incoming Documents", status: "Incoming" },
      { title: "Delayed Documents", status: "Delayed" },
      { title: "Completed Documents", status: "Completed" },
    ];

    // Create statusCards based on the updatedDocumentList with the updated titles
    const statusCards = statusList.map(({ title, status }) => {
      const filteredByStatus = updatedDocumentList.filter(
        (document) => document.status === status
      );
      return {
        title,
        value: filteredByStatus.length,
      };
    });

    // Merge statusCards with the initial card data (Total Documents, etc.)
    const updatedCardData = [...statusCards];

    // Update the status data
    setStatusData(statusCards);

    // Check if updatedCardData has actually changed before setting state
    if (JSON.stringify(cardData) !== JSON.stringify(updatedCardData)) {
      // Set the updated card data, replacing the existing card data
      setCardData(updatedCardData);
    }
  }, [updatedDocumentList, cardData]);

  return (
    <div className="w-full">
      <div className=" flex flex-wrap">
        <Cards data={cardData} />
      </div>
      <div className="flex justify-between xl:flex-row flex-col gap-5 mt-10">
        <div className=" w-full bg-white">
          <div className="flex p-4 bg-gray-300 justify-between items-center">
            <h1 className=" font-bold">Documents Received Chart</h1>
            {/* <YearDropdown handleFilter={filterByYear} /> */}
          </div>

          <LineChartDocumentSubmissions data={officeDocuments} />
        </div>
        <div className="min-w-[350px]">
          <StatusPieChart data={statusData} />
        </div>
      </div>
    </div>
  );
};

export default OfficeDashboard;
