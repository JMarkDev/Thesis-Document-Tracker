import { useState, useEffect } from "react";
import ReceiveDocument from "../../Shared/ReceiveDocument";
import Loader from "../../../components/loader/loginloader/LoginLoading";
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
// import Scanner from "../../../components/qr_scanner/Scanner";
import QrReader from "react-qr-reader";
import documentStatusList from "../../../constants/documentStatusList";

const ScanNow = () => {
  const toast = useToast();
  const user = useSelector(getUserData);
  const [modal, setModal] = useState(false);
  const [tracking_number, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [documentData, setDocumentData] = useState(null);
  const document = useSelector(getDocumentByTrackingNumber);
  const status = useSelector(getStatus);
  const [selected, setSelected] = useState("environment"); // Default to environment camera
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isForwarded, setIsForwarded] = useState(false);
  const [lastRecipient, setLastRecipient] = useState(false);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
    }
  }, [document]);

  const closeMOdal = () => {
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
      fetchDocumentByTrackingNum({ tracking_number, toast: toastUtils() })
    );
  };

  useEffect(() => {
    if (status === "failed") {
      setModal(false);
      setLoading(false);
    } else if (status === "succeeded" && documentData !== null) {
      setLoading(false);
      setModal(true);
    }
  }, [status, documentData]);

  const handleReceive = async () => {
    setLoading(true);
    const data = {
      document_id: documentData.id,
      // office_name,
      user_id: user?.id,
      action: isReceived ? "forwarded" : "received",
      recipient_user: `${user?.firstName} ${user?.middleInitial} ${user?.lastName}`,
      recipient_office: user?.office?.officeName || user?.esuCampus,
    };
    try {
      const response = await api.post("/document/receive-document", data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        closeMOdal();
        setDocumentData(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (documentData?.document_recipients) {
      const isReceived = documentData.document_recipients.find(
        (recipient) =>
          recipient.user_id === user?.id && recipient.received_at !== null
      );
      if (isReceived) {
        setIsReceived(true);
      }

      const isForwarded = documentData.document_recipients.find(
        (recipient) =>
          recipient.user_id === user?.id &&
          recipient.status === documentStatusList.forwarded
      );

      if (isForwarded) {
        setIsForwarded(true);
      }

      const lastRecipient =
        documentData.document_recipients[
          documentData.document_recipients.length - 1
        ];

      if (
        lastRecipient?.user_id === user?.id &&
        lastRecipient?.status === documentStatusList.received
      ) {
        setLastRecipient(true);
      }
    }
  }, [user, documentData]);

  // Function to detect if the user is on a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    // console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      // console.log(`loaded >>>`, scanData);
      // setData(scanData);
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

  const handleError = (err) => {
    console.error(err);
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera permission granted");
    } catch (error) {
      console.error("Camera permission denied or error occurred:", error);
    }
  };

  const handleStartScan = async () => {
    await requestCameraPermission();
    setStartScan(!startScan);
  };

  useEffect(() => {
    // Automatically select the camera based on the device type
    if (startScan) {
      const facingMode = isMobileDevice() ? "environment" : "user"; // Set to back camera on mobile
      setSelected(facingMode);
    }
  }, [startScan]);

  return (
    <div className="w-full ">
      {startScan ? (
        <div className="App flex items-center">
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />

          {loadingScan && <p>Scanning...</p>}
          {/* {data !== "" && <p>{data}</p>} */}
        </div>
      ) : (
        <>
          <form action="" onSubmit={handleSearch}>
            <div className="flex items-center relative">
              <input
                type="text"
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter Tracking Number"
                value={tracking_number}
                className="w-full border border-gray-400 rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl cursor-pointer"
              >
                <MdOutlineFindInPage />
              </button>{" "}
            </div>
          </form>
          <div className="flex mt-4 bg-gray-300 justify-center flex-col gap-5 items-center h-[calc(100vh-160px)]  cursor-pointer">
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

            {loading && <Loader />}
          </div>
        </>
      )}

      {modal && documentData && (
        <ReceiveDocument
          modal={modal}
          closeModal={closeMOdal}
          documentData={documentData}
          handleReceive={handleReceive}
          id={user?.id}
          isReceived={isReceived}
          isForwarded={isForwarded}
          lastRecipient={lastRecipient}
        />
      )}
    </div>
  );
};

export default ScanNow;
