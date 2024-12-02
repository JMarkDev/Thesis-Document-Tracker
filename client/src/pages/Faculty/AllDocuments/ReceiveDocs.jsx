import { useState, useEffect } from "react";
import ReceiveDocument from "../FacultyScan/ReceivedDocument";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNumber,
  getStatus,
  reset,
  fetchDocumentsByUserId,
  getAllDocumentsByUserId,
} from "../../../services/documentSlice";
import PropTypes from "prop-types";
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
// import rolesList from "../../../constants/rolesList";
import io from "socket.io-client";
const socket = io.connect(`${api.defaults.baseURL}`);

const ScanNow = ({ trackingNumber }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(getUserData);
  const document = useSelector(getDocumentByTrackingNumber);
  const facultyDocuments = useSelector(getAllDocumentsByUserId);
  const status = useSelector(getStatus);
  const [successModal, setSuccessModal] = useState(false);
  const [modal, setModal] = useState(false);
  //   const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isForwarded, setIsForwarded] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  const [lastRecipient, setLastRecipient] = useState(false);
  const [recipientOffice, setRecipientOffice] = useState("");
  const [officeId, setOfficeId] = useState(null);
  const [nextRoute, setNextRoute] = useState(null);
  const [receivedLoader, setReceivedLoader] = useState(false);
  const [action, setAction] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [returnStatus, setReturnStatus] = useState(false);
  const [alreadyReturn, setAlreadyReturn] = useState(false);
  const [comments, setComments] = useState("");

  //   useEffect(() => {
  //     dispatch(reset());
  //   }, [dispatch]);

  useEffect(() => {
    if (trackingNumber) {
      dispatch(
        fetchDocumentByTrackingNum({
          tracking_number: trackingNumber,
          toast: toastUtils(),
        })
      );
    }
  }, [trackingNumber, dispatch]);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchDocumentsByUserId(user?.user_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (trackingNumber) {
      const facultyDocs = facultyDocuments.filter((docs) => {
        if (docs.tracking_number === trackingNumber) return docs;
      });

      if (facultyDocs[0]?.status === documentStatusList.returned) {
        setIsReturn(true);
      }
    }
  }, [trackingNumber, facultyDocuments]);

  useEffect(() => {
    if (status === "failed") {
      setModal(false);
      setLoading(false);
      dispatch(reset());
    } else if (status === "succeeded" && documentData) {
      setLoading(false);
      //   setModal(true); // Modal is set to open here
    }
  }, [status, documentData, dispatch]);

  useEffect(() => {
    setRecipientOffice(`${user?.esuCampus.toUpperCase()} FACULTY`);
  }, [user]);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
      setDocumentName(document.document_name);
      setDocumentId(document.id);
      if (document.status === documentStatusList.returned) {
        setReturnStatus(true);
      }
    }
  }, [document]);

  const closeModal = () => {
    setModal(false);
    // setDocumentData(null);
    setLoading(false);
    // setTrackingNumber("");
    // dispatch(reset());
    dispatch(
      fetchDocumentByTrackingNum({
        tracking_number: trackingNumber,
        toast: toastUtils(),
      })
    );
    // setIsReturn(false);
  };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     dispatch(
  //       fetchDocumentByTrackingNum({
  //         tracking_number: trackingNumber,
  //         toast: toastUtils(),
  //       })
  //     );
  //   };

  useEffect(() => {
    if (status === "failed") {
      setModal(false);
      setLoading(false);
    } else if (status === "succeeded" && documentData) {
      setLoading(false);
      //   setModal(true);
    }
  }, [status, documentData]);

  const handleReceive = async (act) => {
    setAction(act);
    // setLoading(true);
    setReceivedLoader(true);
    const data = {
      document_id: documentData.id,
      user_id: officeId,
      action: act,
      recipient_user: `${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`,
      recipient_office: recipientOffice,
      document_name: documentData.document_name,
      next_route: nextRoute,
      faculty_received: act === "forwarded" ? "forwarded" : null,
      comments: comments,
    };

    try {
      const response = await api.post("/document/receive-document", data);
      if (response.data.status === "success") {
        socket.emit("received_document", data);
        toast.success(response.data.message);
        setSuccessModal(true);
        setReceivedLoader(false);
        // setTrackingNumber("");
        setTimeout(() => {
          closeModal();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const recipientData = documentData?.document_recipients || [];
    const fullName = `${user?.firstName} ${user?.middleInitial}. ${user?.lastName} (FACULTY)`;

    const checkRecipient = recipientData.find((recipient) => {
      return (
        recipient.office_name === recipientOffice ||
        recipient.office_name === fullName.toUpperCase()
      );
    });

    if (checkRecipient?.received_at) {
      setIsReceived(true);
    }

    if (checkRecipient?.returned_at) {
      setAlreadyReturn(true);
    }

    setOfficeId(checkRecipient?.user_id);

    if (checkRecipient && checkRecipient !== undefined) {
      setIsRecipient(true);
    }

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
    if (
      documentData?.status === documentStatusList.forwarded ||
      recipientForwarded
    )
      setIsForwarded(true);

    // if (recipientForwarded) setIsForwarded(true);
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

  const handleComment = (e) => {
    setComments(e);
  };
  // console.log(nextRoute);

  //   const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

  //   const handleScan = async (scanData) => {
  //     if (scanData) {
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
  //     console.error("Error starting camera:", err);
  //     if (err.name === "NotAllowedError") {
  //       alert(
  //         "Camera access was denied. Please enable it in your browser settings."
  //       );
  //     } else if (err.name === "NotFoundError") {
  //       alert("No camera found on this device.");
  //     } else {
  //       alert("Unable to access camera: " + err.message);
  //     }
  //   };

  //   const requestCameraPermission = async () => {
  //     const isMobile = isMobileDevice();
  //     const constraints = {
  //       video: {
  //         facingMode: isMobile ? { exact: "environment" } : "user", // Rear camera on mobile, front on desktop
  //         width: { ideal: 1280 },
  //         height: { ideal: 720 },
  //       },
  //     };

  //     try {
  //       await navigator.mediaDevices.getUserMedia(constraints);
  //       console.log("Camera permission granted");

  //       // Handle stream (e.g., assign to video element if needed)
  //     } catch (error) {
  //       // Fallback for mobile: Try front camera if rear camera fails
  //       if (error.name === "OverconstrainedError") {
  //         try {
  //           const fallbackConstraints = {
  //             video: {
  //               facingMode: "user", // Use front camera
  //               width: { ideal: 1280 },
  //               height: { ideal: 720 },
  //             },
  //           };
  //           await navigator.mediaDevices.getUserMedia(fallbackConstraints);
  //           console.log("Fallback to front camera successful");

  //           // Handle fallback stream (e.g., assign to video element if needed)
  //         } catch (fallbackError) {
  //           handleError(fallbackError);
  //         }
  //       } else {
  //         handleError(error);
  //       }
  //     }
  //   };

  //   const handleStartScan = async () => {
  //     setLoading(true);
  //     await requestCameraPermission();
  //     setStartScan(!startScan);
  //   };

  //   useEffect(() => {
  //     if (startScan) {
  //       setLoading(false);
  //       setSelected(isMobileDevice() ? "environment" : "user");
  //     }
  //   }, [startScan]);

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
            action={action}
            documentId={documentId}
          />
        )}
        <div className=" rounded-full absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {loading && <TrackLoader />}
        </div>

        {/* {startScan ? (
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
                  placeholder="Enter Tracking Code"
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
        )} */}
        <button
          onClick={() => setModal(true)}
          className="bg-main hover:bg-main_hover font-bold text-white px-10 py-2 rounded-lg"
        >
          Action
        </button>
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
            isRecipient={isRecipient}
            isReturn={isReturn}
            returnStatus={returnStatus}
            alreadyReturn={alreadyReturn}
            handleComment={handleComment}
          />
        )}
      </div>
    </>
  );
};

ScanNow.propTypes = {
  trackingNumber: PropTypes.string,
};

export default ScanNow;
