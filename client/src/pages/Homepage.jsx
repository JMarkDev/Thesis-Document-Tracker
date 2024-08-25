import { useRef, useState, useEffect } from "react";
import landingImg from "../assets/images/landing page background (2).jpg";
import NavBar from "../components/navbar/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import chatbotImg from "../assets/images/chatbot_icon.png";
import wmsuLogo from "../assets/images/wmsu logo.png";
import esuLogo from "../assets/images/WMSU ESU LOGO.png";
import { FiSend } from "react-icons/fi";
import CrossIcon from ".././assets/images/cross.png";
import Loading from "../components/loader/loadingBall";
import Loader from "../components/loader/track_loader/tracking_loader";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNum,
  documentError,
} from "../services/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { toastUtils } from "../hooks/useToast";
import DocumentMedata from "./DocumentMetadata";

const Homepage = () => {
  const dispatch = useDispatch();
  const document = useSelector(getDocumentByTrackingNum);
  const error = useSelector(documentError);
  const [userQuery, setUserQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainer = useRef(null);
  const option = ["track document", "upload document", "register account"];
  const text = "Welcome to our Chatbot! How can I assist you today?".split(" ");
  const [openChat, setOpenChat] = useState(false);
  const [tracking_number, setTrackingNum] = useState(null);
  const [documentData, setDocumentData] = useState([]);
  const [modal, setModal] = useState(false);
  // useEffect(() => {
  //   // Scroll to the bottom of the chat container
  //   chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  // }, [conversation]);

  const searchDocument = (e) => {
    e.preventDefault();
    setDocumentData(null);
    // if (tracking_number !== null) {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        fetchDocumentByTrackingNum({ tracking_number, toast: toastUtils() })
      );
    }, 1000);
    // }
  };

  console.log(documentData);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (document) {
      setIsLoading(false);
      setDocumentData(document);
      setModal(true);
    }
  }, [document]);

  const closeModal = () => {
    setModal(false);
    setDocumentData(null);
  };

  return (
    <>
      <NavBar />

      <div className="relative w-full h-[calc(100vh-4rem)]">
        {isLoading && (
          <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rounded-full p-2 bg-gray-500">
            <Loader />
          </div>
        )}
        {modal && (
          <DocumentMedata
            modal={modal}
            closeModal={closeModal}
            document={documentData}
          />
        )}

        <img
          src={landingImg}
          alt=""
          className="absolute w-full h-full object-cover z-10"
        />
        <div className="absolute top-16 md:ml-10 ml-3 z-20">
          <h3 className="md:text-xl text-sm text-main">
            Western Mindanao State University - External Studies Unit
          </h3>
          <h1 className="text-wmsu md:text-7xl text-5xl font-extrabold mt-4 tracking-wider">
            WMSU - ESU
          </h1>
          <h2 className="text-document-tracker font-extrabold  md:text-5xl text-2xl mt-4">
            DOCUMENT TRACKER
          </h2>
          <form action="" onSubmit={searchDocument}>
            <div className="flex items-center mt-4 relative w-full">
              <input
                type="text"
                onChange={(e) => setTrackingNum(e.target.value)}
                placeholder="Enter Tracking Number"
                className="p-2 md:text-lg text-sm w-full rounded-lg border-2 outline-none border-[#8a7665] focus:outline-none focus:ring-0 focus:border-yellow shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-0 text-2xl bg-yellow hover:bg-yellow_hover md:h-12 p-2 rounded-lg"
              >
                <IoSearchSharp />
              </button>
            </div>
          </form>
        </div>
        <div className=" hidden sm:flex md:flex-row  absolute top-5 lg:right-20 right-5 z-30 gap-5">
          <img
            src={wmsuLogo}
            className="lg:h-40 h-20 sm:mt-10"
            alt="WMSU Logo"
          />
          <img src={esuLogo} alt="esu" className="lg:h-44 h-20" />
        </div>
        <div className="absolute right-5 bottom-10 z-30">
          <div
            onClick={() => setOpenChat(!openChat)}
            className="p-[2px] bg-[#ffffff] rounded-full h-16 w-16 hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
          >
            <img src={chatbotImg} alt="icon" className="filter-orange" />
          </div>
        </div>
        <div>
          {openChat && (
            <div className="z-30 bg-[#f2f2f2] h-[450px] transition-all shadow-2xl drop-shadow-xl w-[375px] fixed m-2 bottom-24 rounded-lg right-0">
              <div className="flex bg-main p-1 rounded-t-lg justify-between">
                <div className="flex">
                  <img
                    src={chatbotImg}
                    alt="chatbot"
                    className="filter-orange w-10 h-10 rounded-full"
                  />
                  <p className="text-sm text-white p-3 rounded-t-lg ">
                    WMSU-ESU Document Tracker Chatbot
                  </p>
                </div>
                <div className="">
                  <img
                    onClick={() => setOpenChat(!openChat)}
                    className="w-8 invert m-1 cursor-pointer"
                    src={CrossIcon}
                    alt="cross"
                  />
                </div>
              </div>
              <div
                className="h-[280px] pb-2 overflow-y-auto "
                ref={chatContainer}
              >
                <div className="flex flex-col gap-2 mt-7 mx-3">
                  <div className="flex gap-2">
                    <img
                      src={chatbotImg}
                      alt="chatbot"
                      className="filter-orange w-7 h-7 rounded-full"
                    />
                    <p className="text-sm rounded-lg p-2 mr-8 bg-gray-300 py-3 transition-all ">
                      Welcome to our Chatbot! How can I assist you today?
                    </p>
                  </div>
                  {conversation.map((convo, index) => {
                    const lastItem = index === conversation.length - 1;
                    return (
                      <div key={index}>
                        <div className="mr-3 flex justify-end">
                          <p className="text-sm ml-12 my-2 p-2 rounded-lg bg-slate-500 text-white">
                            {convo.user_query}
                            hello
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <img
                            src={chatbotImg}
                            alt="chatbot"
                            className="w-7 h-7 rounded-full"
                          />
                          <div className="flex items-center">
                            {lastItem && isLoading ? (
                              <Loading />
                            ) : (
                              <p
                                className="text-sm rounded-lg p-2 mr-8 bg-gray-300"
                                dangerouslySetInnerHTML={
                                  {
                                    // __html: formatResponse(convo.bot_response),
                                  }
                                }
                              ></p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex px-1 gap-1 flex-wrap">
                {option.map((options, index) => (
                  <div
                    key={index}
                    className="text-sm px-2 py-1 hover:bg-main hover:text-white border border-main rounded-full text-main cursor-pointer transition-all"
                    // onClick={() => handleOptionClick(options)}
                  >
                    {options}
                  </div>
                ))}
              </div>
              <div className="absolute z-30 rounded-b-lg bg-[#f2f2f2] left-0 bottom-0 w-full px-3">
                <form
                  action=""
                  // onSubmit={handleSubmit}
                >
                  <div className="flex relative flex-row-reverse justify-center items-center">
                    <FiSend
                      // onClick={handleSubmit}
                      className="text-xl text-main cursor-pointer absolute z-10 bottom-4 right-3"
                    />
                    <input
                      type="text"
                      className="relative w-full mb-2 p-2 rounded-full text-sm focus:outline-none border border-[#d67878] focus:border-main"
                      placeholder="Type a message"
                      // value={userQuery}
                      // onChange={(e) => setUserQuery(e.target.value)}
                    />
                  </div>
                </form>
                <p className="text-sm p-1 flex justify-center text-gray-600">
                  @wmsu-esu-document-tracker{new Date().getFullYear()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
