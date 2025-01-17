import Cards from "../../../components/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/YearDropdown";
import {
  adminAnalytics,
  fetchDataEsuByYear,
  getDataByYear,
  fetchDataByCampus,
  fetchDataByDocumentType,
} from "../../../services/analyticsSlice";
import { getUserData } from "../../../services/authSlice";
import {
  getAllDocuments,
  filterDocumentsByESU,
} from "../../../services/documentSlice";
import StatusPieChart from "../../../components/charts/StatusPieChart";
import LineChartDocumentSubmissions from "../../../components/charts/LineChartDocumentSubmissions";

const EsuDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const dataByYear = useSelector(getDataByYear);
  const [cardData, setCardData] = useState([]);
  const [officeRecipient, setOfficeRecipient] = useState("");
  const [updatedDocumentList, setUpdatedDocumentList] = useState([]);
  const documents = useSelector(getAllDocuments);
  const [statusData, setStatusData] = useState([]);
  const [esuCampus, setEsuCampus] = useState("");
  // const [campusRegistrar, setCampusRegistrar] = useState("");
  const [fullName, setFullName] = useState("");
  const normalizeString = (str) => str?.trim().replace(/\./g, "").toLowerCase();

  useEffect(() => {
    dispatch(adminAnalytics());
    dispatch(
      fetchDataEsuByYear({
        esuCampus: `${user?.esuCampus}`,
        year: new Date().getFullYear(),
      })
    );
    dispatch(filterDocumentsByESU(user?.esuCampus));
    dispatch(fetchDataByCampus());
    dispatch(fetchDataByDocumentType());

    if (user) {
      setEsuCampus(user?.esuCampus);
      setOfficeRecipient(`${user?.esuCampus} REGISTRAR`);
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

  useEffect(() => {
    const updateDocumentStatuses = () => {
      // 24 hours in milliseconds
      const Hours = 86400000;
      const currentTime = new Date();

      const updatedDocumentList = documents?.map((document) => {
        // Check if all recipients have received the document
        const allReceived = document?.document_recipients.every(
          (recipient) => recipient.received_at !== null
        );

        let deadlinePassed = false;
        // Check if document have deadline
        const hasDeadline = document?.deadline;
        if (hasDeadline) {
          const deadline = new Date(
            hasDeadline?.toLocaleString("en-US", { timeZone: "UTC" })
          );

          if (currentTime > deadline) {
            deadlinePassed = true;
          }
        }

        // Find the current office and check if it has received the document
        const officeReceived = document?.document_recipients.find(
          (recipient) =>
            recipient.office_name === officeRecipient &&
            recipient.received_at !== null
        );

        const lastReveived = document?.document_recipients
          .filter((recipient) => recipient.received_at !== null)
          .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0];

        const receivedAt = new Date(lastReveived?.received_at);
        const localReceivedAt = receivedAt.toLocaleString("en-US", {
          timeZone: "UTC",
        });

        const timeDifference = currentTime - new Date(localReceivedAt);

        let status = null;
        if (
          !allReceived &&
          officeReceived &&
          normalizeString(fullName) !== normalizeString(document.uploaded_by)
        ) {
          status = "Received"; // Prioritize the "Received" status
        } else if (!allReceived && deadlinePassed) {
          status = "Delayed";
        } else if (timeDifference > Hours && !allReceived) {
          status = "Delayed";
        } else if (allReceived) {
          status = "Completed";
        } else if (
          // !allReceived &&
          normalizeString(fullName) === normalizeString(document.uploaded_by)
        ) {
          status = "Uploaded";
        } else {
          status = "Incoming";
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
      if (JSON.stringify(updatedDocumentList) !== JSON.stringify(documents)) {
        setUpdatedDocumentList(updatedDocumentList);
      }
    };

    updateDocumentStatuses();
  }, [documents, user, officeRecipient, fullName]); // Add proper dependencies

  useEffect(() => {
    // Ensure updatedDocumentList and data are not empty or unchanged

    const statusList = [
      { title: "Received Documents", status: "Received" },
      { title: "Incoming Documents", status: "Incoming" },
      { title: "Delayed Documents", status: "Delayed" },
      { title: "Completed Documents", status: "Completed" },
    ];

    // Create statusCards based on the updatedDocumentList with the updated titles
    const statusCards = statusList?.map(({ title, status }) => {
      const filteredByStatus = updatedDocumentList.filter(
        (document) => document.status === status
      );
      return {
        title,
        value: filteredByStatus.length,
        documents: filteredByStatus,
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
            <YearDropdown handleFilter={filterByYear} />
          </div>

          <LineChartAdmin data={dataByYear} />
        </div>
        {/* <div className="min-w-[350px]">
          <StatusPieChart data={statusData} />
        </div> */}
      </div>
      {/* <div>
        <div className="min-w-[350px]">
          <PieChart />
        </div>
      </div> */}

      <div className="mt-10">
        <h2 className="font-bold p-4 bg-gray-300">
          Document Submissions Charts
        </h2>
        <LineChartDocumentSubmissions data={documents} />
      </div>
    </div>
  );
};

export default EsuDashboard;
