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
      action: "received",
      recipient_user: `${user?.firstName} ${user?.middleInitial} ${user?.lastName}`,
      recipient_office: user?.office.officeName || user?.esuCampus,
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

  console.log(documentData);

  return (
    <div className="w-full ">
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
      <div className="flex mt-4 bg-gray-300 justify-center items-center h-[calc(100vh-160px)]  cursor-pointer">
        <button className="bg-main text-white px-10 py-2 rounded-lg">
          Scan Now
        </button>
        {loading && <Loader />}
        {modal && documentData && (
          <ReceiveDocument
            modal={modal}
            closeModal={closeMOdal}
            documentData={documentData}
            handleReceive={handleReceive}
          />
        )}
      </div>
    </div>
  );
};

export default ScanNow;
