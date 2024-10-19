// import { useState, useEffect } from "react";
// import ReceiveDocument from "../../Shared/ReceiveDocument";
// // import Loader from "../../../components/loader/loginloader/LoginLoading";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDocumentByTrackingNum,
//   getDocumentByTrackingNumber,
//   getStatus,
//   reset,
// } from "../../../services/documentSlice";
// import { toastUtils } from "../../../hooks/useToast";
// import { MdOutlineFindInPage } from "react-icons/md";
// import api from "../../../api/axios";
// import { getUserData } from "../../../services/authSlice";
// import { useToast } from "../../../hooks/useToast";
// import qrImg from "../../../assets/images/qr-code.png";
// // import Scanner from "../../../components/qr_scanner/Scanner";
// import QrReader from "react-qr-reader";
// import documentStatusList from "../../../constants/documentStatusList";
// import "../../../components/qr_scanner/styles.css";
// import TrackLoader from "../../../components/loader/track_loader/Track";

// const ScanNow = () => {
//   const toast = useToast();
//   const user = useSelector(getUserData);
//   const [modal, setModal] = useState(false);
//   const [tracking_number, setTrackingNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const [documentData, setDocumentData] = useState(null);
//   const document = useSelector(getDocumentByTrackingNumber);
//   const status = useSelector(getStatus);
//   const [selected, setSelected] = useState("environment"); // Default to environment camera
//   const [startScan, setStartScan] = useState(false);
//   const [loadingScan, setLoadingScan] = useState(false);
//   const [isReceived, setIsReceived] = useState(false);
//   const [isForwarded, setIsForwarded] = useState(false);
//   const [lastRecipient, setLastRecipient] = useState(false);
//   const [recipientOffice, setRecipientOffice] = useState("");
//   const [officeId, setOfficeId] = useState(null);

//   useEffect(() => {
//     if (document) {
//       setDocumentData(document);
//     }
//   }, [document]);

//   const closeMOdal = () => {
//     setModal(false);
//     setDocumentData(null);
//     setLoading(false);
//     setTrackingNumber("");
//     dispatch(reset());
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     dispatch(
//       fetchDocumentByTrackingNum({ tracking_number, toast: toastUtils() })
//     );
//   };

//   useEffect(() => {
//     if (status === "failed") {
//       setModal(false);
//       setLoading(false);
//     } else if (status === "succeeded" && documentData !== null) {
//       setLoading(false);
//       setModal(true);
//     }
//   }, [status, documentData]);

//   const handleReceive = async () => {
//     setLoading(true);
//     const data = {
//       document_id: documentData.id,
//       // office_name,
//       user_id: officeId,
//       action: isReceived ? "forwarded" : "received",
//       recipient_user: `${user?.firstName} ${user?.middleInitial} ${user?.lastName}`,
//       recipient_office: user?.office?.officeName || user?.esuCampus,
//     };
//     try {
//       const response = await api.post("/document/receive-document", data);
//       if (response.data.status === "success") {
//         toast.success(response.data.message);
//         closeMOdal();
//         setDocumentData(null);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user.esuCampus) {
//       setRecipientOffice(user.esuCampus);
//     } else {
//       setRecipientOffice(user.office.officeName);
//     }
//     // setRecipientOffice(user.esuCampus);
//     if (documentData?.document_recipients) {
//       const isReceived = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.user_id === user?.id && recipient.received_at !== null
//       );

//       const recipientReceived = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.office_name
//             .toLowerCase()
//             .includes(recipientOffice.trim().toLowerCase()) &&
//           !recipient.office_name.toLowerCase().includes("faculty") &&
//           recipient.received_at !== null
//       );

//       const recipientForwarded = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.office_name
//             .toLowerCase()
//             .includes(recipientOffice.trim().toLowerCase()) &&
//           !recipient.office_name.toLowerCase().includes("faculty") &&
//           recipient.received_at !== null &&
//           recipient.status === documentStatusList.forwarded
//       );

//       const esuCampus = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.office_name
//             .toLowerCase()
//             .includes(recipientOffice.trim().toLowerCase()) &&
//           !recipient.office_name.toLowerCase().includes("faculty") &&
//           recipient.received_at !== null
//       );

//       const Campus = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.office_name
//             .toLowerCase()
//             .includes(recipientOffice.trim().toLowerCase()) &&
//           !recipient.office_name.toLowerCase().includes("faculty") // Exclude "FACULTY"
//       );

//       if (Campus) {
//         setOfficeId(Campus?.user_id);
//       }

//       if (recipientForwarded) {
//         setIsForwarded(true);
//       }

//       // setOfficeId(esuCampusReceived?.user_id);

//       if (isReceived || recipientReceived || esuCampus) {
//         setIsReceived(true);
//       }

//       const isForwarded = documentData.document_recipients.find(
//         (recipient) =>
//           recipient.user_id === user?.id &&
//           recipient.status === documentStatusList.forwarded
//       );

//       if (isForwarded) {
//         setIsForwarded(true);
//       }

//       const lastRecipient =
//         documentData.document_recipients[
//           documentData.document_recipients.length - 1
//         ];

//       if (
//         (lastRecipient?.user_id === user?.id &&
//           lastRecipient?.status === documentStatusList.received) ||
//         (user.officeId === officeId &&
//           lastRecipient?.status === documentStatusList.received)
//       ) {
//         setLastRecipient(true);
//       }

//       if (user?.office?.officeName) {
//         setOfficeId(user?.office?.id);
//         setRecipientOffice(user?.office?.officeName);
//       }
//     }
//   }, [user, recipientOffice, documentData, officeId]);

//   // Function to detect if the user is on a mobile device
//   const isMobileDevice = () => {
//     return /Mobi|Android/i.test(navigator.userAgent);
//   };

//   const handleScan = async (scanData) => {
//     setLoadingScan(true);

//     // console.log(`loaded data data`, scanData);
//     if (scanData && scanData !== "") {
//       // console.log(`loaded >>>`, scanData);
//       // setData(scanData);
//       dispatch(
//         fetchDocumentByTrackingNum({
//           tracking_number: scanData,
//           toast: toastUtils(),
//         })
//       );
//       setStartScan(false);
//       setLoadingScan(false);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   const requestCameraPermission = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ video: true });
//       console.log("Camera permission granted");
//     } catch (error) {
//       console.error("Camera permission denied or error occurred:", error);
//     }
//   };

//   const handleStartScan = async () => {
//     setLoading(true);
//     await requestCameraPermission();
//     setStartScan(!startScan);
//   };

//   useEffect(() => {
//     // Automatically select the camera based on the device type
//     if (startScan) {
//       setLoading(false);
//       const facingMode = isMobileDevice() ? "environment" : "user"; // Set to back camera on mobile
//       setSelected(facingMode);
//     }
//   }, [startScan]);

//   return (
//     <div className="w-full relative">
//       <div className=" rounded-full absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//         {loading && <TrackLoader />}
//       </div>

//       {startScan ? (
//         <div className="App ">
//           <QrReader
//             facingMode={selected}
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             style={{ width: "300px" }}
//           />

//           {loadingScan && <p>Scanning...</p>}
//         </div>
//       ) : (
//         <>
//           <form action="" onSubmit={handleSearch}>
//             <div className="flex items-center relative">
//               <input
//                 type="text"
//                 onChange={(e) => setTrackingNumber(e.target.value)}
//                 placeholder="Enter Tracking Number"
//                 value={tracking_number}
//                 className="w-full border border-gray-400 rounded-lg"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl cursor-pointer"
//               >
//                 <MdOutlineFindInPage />
//               </button>{" "}
//             </div>
//           </form>
//           <div className="flex mt-4 bg-gray-300 justify-center flex-col gap-5 items-center h-[calc(100vh-160px)]  cursor-pointer">
//             <img
//               onClick={handleStartScan}
//               src={qrImg}
//               alt="qr-code"
//               className="w-16 hover:scale-110 transform transition-all"
//             />
//             <button
//               onClick={handleStartScan}
//               className="bg-main hover:bg-main_hover text-white px-10 py-2 rounded-lg"
//             >
//               Scan Now
//             </button>

//             {/* {loading && <Loader />} */}
//           </div>
//         </>
//       )}

//       {modal && documentData && (
//         <ReceiveDocument
//           modal={modal}
//           closeModal={closeMOdal}
//           documentData={documentData}
//           handleReceive={handleReceive}
//           id={user?.id}
//           isReceived={isReceived}
//           isForwarded={isForwarded}
//           lastRecipient={lastRecipient}
//         />
//       )}
//     </div>
//   );
// };

// export default ScanNow;
import { useState, useEffect } from "react";
import ReceiveDocument from "../../Shared/ReceiveDocument";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNumber,
  getStatus,
  reset,
} from "../../../services/documentSlice";
import { toastUtils } from "../../../hooks/useToast";
import { MdOutlineFindInPage } from "react-icons/md";
import api from "../../../api/axios";
import { getUserData } from "../../../services/authSlice";
import { useToast } from "../../../hooks/useToast";
import qrImg from "../../../assets/images/qr-code.png";
import QrReader from "react-qr-reader";
import documentStatusList from "../../../constants/documentStatusList";
import TrackLoader from "../../../components/loader/track_loader/Track";
import "../../../components/qr_scanner/styles.css";
import SuccessModal from "../../../components/SuccessModal";
import rolesList from "../../../constants/rolesList";

const ScanNow = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(getUserData);
  const document = useSelector(getDocumentByTrackingNumber);
  const status = useSelector(getStatus);
  const [successModal, setSuccessModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isForwarded, setIsForwarded] = useState(false);
  const [lastRecipient, setLastRecipient] = useState(false);
  const [recipientOffice, setRecipientOffice] = useState("");
  const [officeId, setOfficeId] = useState(null);
  const [nextRoute, setNextRoute] = useState(null);
  const [receivedLoader, setReceivedLoader] = useState(false);

  useEffect(() => {
    if (
      user.role === rolesList.campus_admin ||
      user.role === rolesList.registrar
    ) {
      setRecipientOffice(`${user.esuCampus.toUpperCase()} REGISTRAR`);
    } else if (user.office?.officeName) {
      setRecipientOffice(user.office?.officeName);
    }
  }, [user]);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
      setDocumentName(document.document_name);
      setDocumentId(document.id);
    }
  }, [document]);

  const closeModal = () => {
    setModal(false);
    setDocumentData(null);
    setLoading(false);
    setTrackingNumber("");
    dispatch(reset());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      fetchDocumentByTrackingNum({
        tracking_number: trackingNumber,
        toast: toastUtils(),
      })
    );
  };

  useEffect(() => {
    if (status === "failed") {
      setModal(false);
      setLoading(false);
    } else if (status === "succeeded" && documentData) {
      setLoading(false);
      setModal(true);
    }
  }, [status, documentData]);

  const handleReceive = async () => {
    setLoading(true);
    setReceivedLoader(true);
    const data = {
      document_id: documentData.id,
      user_id: officeId,
      action: isReceived ? "forwarded" : "received",
      recipient_user: `${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`,
      recipient_office: recipientOffice,
      document_name: documentData.document_name,
      next_route: nextRoute,
    };
    try {
      const response = await api.post("/document/receive-document", data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setSuccessModal(true);
        setReceivedLoader(false);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const recipientData = documentData?.document_recipients || [];
    // if (user.esuCampus) {
    //   setRecipientOffice(user.esuCampus);
    // } else {
    //   setRecipientOffice(user.office.officeName);
    // }
    // console.log(recipientOffice);

    const recipientReceived = recipientData.find(
      (recipient) =>
        recipient.office_name
          .toLowerCase()
          .includes(recipientOffice.trim().toLowerCase()) &&
        !recipient.office_name.toLowerCase().includes("faculty") &&
        recipient.received_at !== null
    );

    const recipientForwarded = recipientData.find(
      (recipient) =>
        recipient.office_name
          .toLowerCase()
          .includes(recipientOffice.trim().toLowerCase()) &&
        !recipient.office_name.toLowerCase().includes("faculty") &&
        recipient.status === documentStatusList.forwarded
    );

    if (recipientForwarded) setIsForwarded(true);
    if (recipientReceived) setIsReceived(true);

    const lastRecipient = recipientData[recipientData.length - 1];
    if (
      (lastRecipient?.user_id === user?.id &&
        lastRecipient?.status === documentStatusList.received) ||
      (user.officeId === officeId &&
        lastRecipient?.status === documentStatusList.received)
    ) {
      setLastRecipient(true);
    }

    const campusRecipient = recipientData.find(
      (recipient) =>
        recipient.office_name
          .toLowerCase()
          .includes(recipientOffice.trim().toLowerCase()) &&
        !recipient.office_name.toLowerCase().includes("faculty")
    );
    if (campusRecipient) setOfficeId(campusRecipient?.user_id);

    // Find the index of the current recipient office
    const currentIndex = recipientData.findIndex((recipient) =>
      recipient.office_name
        .toLowerCase()
        .includes(recipientOffice.trim().toLowerCase())
    );

    // Get the next recipient office if it exists
    if (currentIndex !== -1 && currentIndex < recipientData.length - 1) {
      const nextRecipient = recipientData[currentIndex + 1];
      setNextRoute(nextRecipient?.office_name);
      // setOfficeId(nextRecipient?.user_id); // Set the next office's user ID if needed
    } else {
      setNextRoute(null); // No more routes
    }
  }, [user, recipientOffice, documentData, officeId]);
  // console.log(nextRoute);

  const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

  const handleScan = async (scanData) => {
    if (scanData) {
      dispatch(
        fetchDocumentByTrackingNum({
          tracking_number: scanData,
          toast: toastUtils(),
        })
      );
      setStartScan(false);
      setLoadingScan(false);
    }
  };

  const handleError = (err) => console.error(err);

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera permission granted");
    } catch (error) {
      console.error("Camera permission denied or error occurred:", error);
    }
  };

  const handleStartScan = async () => {
    setLoading(true);
    await requestCameraPermission();
    setStartScan(!startScan);
  };

  useEffect(() => {
    if (startScan) {
      setLoading(false);
      setSelected(isMobileDevice() ? "environment" : "user");
    }
  }, [startScan]);

  const handleSuccessModal = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 1000);
  };

  return (
    <>
      <div className="w-full relative">
        {successModal && (
          <SuccessModal
            successModal={successModal}
            closeSuccessModal={handleSuccessModal}
            documentName={documentName}
            action={isReceived ? "forwarded" : "received"}
            documentId={documentId}
          />
        )}
        <div className=" rounded-full absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {loading && <TrackLoader />}
        </div>

        {startScan ? (
          <div className="App ">
            <QrReader
              facingMode={selected}
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "300px" }}
            />

            {loadingScan && <p>Scanning...</p>}
          </div>
        ) : (
          <>
            <form onSubmit={handleSearch}>
              <div className="flex items-center relative">
                <input
                  type="text"
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter Tracking Number"
                  value={trackingNumber}
                  className="w-full border border-gray-400 rounded-lg"
                />
                <button
                  type="submit"
                  className="absolute right-4  text-blue-500 text-2xl"
                >
                  <MdOutlineFindInPage />
                </button>
              </div>
            </form>
            <div className="flex mt-4 bg-gray-300 justify-center flex-col gap-5 items-center h-[calc(100vh-160px)]">
              <img
                onClick={handleStartScan}
                src={qrImg}
                alt="qr-code"
                className="w-16 hover:scale-110 transform transition-all"
              />
              <button
                onClick={handleStartScan}
                className="bg-main hover:bg-main_hover text-white px-10 py-2 rounded-lg"
              >
                Scan Now
              </button>
            </div>
          </>
        )}
        {modal && documentData && (
          <ReceiveDocument
            modal={modal}
            closeModal={closeModal}
            documentData={documentData}
            handleReceive={handleReceive}
            id={user?.id}
            isReceived={isReceived}
            isForwarded={isForwarded}
            lastRecipient={lastRecipient}
            receivedLoader={receivedLoader}
          />
        )}
      </div>
    </>
  );
};

export default ScanNow;
