import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Back from "../../components/buttons/Back";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../services/documentWolkflowSlice";
import { getUserData } from "../../services/authSlice";
import { MdDelete } from "react-icons/md";
import DocumentRoute from "../../components/dropdown/DocumentRoute";
import api from "../../api/axios";
import Loading from "../../components/loader/loginloader/LoginLoading";
import { useToast } from "../../hooks/useToast";
import rolesList from "../../constants/rolesList";
import io from "socket.io-client";
const socket = io.connect(`${api.defaults.baseURL}`);

const UploadDocuments = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const documentType = useSelector(getAllWorkflow);
  const user = useSelector(getUserData);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [document_name, setDocumentName] = useState("");
  const [document_desc, setDocumentDesc] = useState("");
  const [document_type, setDocumentType] = useState("");
  const [file_type, setFileType] = useState("");
  const [uploaded_by, setUploadedBy] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [esuCampus, setEsuCampus] = useState("");
  const [user_id, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrarId, setRegistrarId] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [route, setRoute] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState([]);
  const [deadline, setDeadline] = useState(null);

  const [trackingNumberError, setTrackingNumberError] = useState("");
  const [documentNameError, setDocumentNameError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [fileTypeError, setFileTypeError] = useState("");

  useEffect(() => {
    dispatch(fetchAllWorkflow());
    setUploadedBy(
      `${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`
    );
    setEsuCampus(user?.esuCampus || null);
    setUserId(user?.id);
    setContactNumber(user?.contactNumber);

    if (user?.role === rolesList.faculty) {
      setFacultyId(user?.id);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.esuCampus) {
      const getRegistrar = async () => {
        try {
          const response = await api.get(
            `/office/esu-registrar/${user?.esuCampus}`
          );
          if (response.data) {
            setRegistrarId(response.data.id);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getRegistrar();
    }
  }, [user]);

  const generageTrackingNumber = () => {
    setLoading(true);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let result = "";
    const charactersLength = characters.length;
    const numbersLength = numbers.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }

    setTrackingNumber(result);
    setLoading(false);
    return result;
  };

  const isOfficeInRoute = (officeName) => {
    return route.some((office) => office.office_name === officeName);
  };

  // Function to handle adding selected office to the route array
  const handleSelectOffice = (officeName, userId) => {
    // Add new step with office name to the route
    setRoute([...route, { office_name: officeName, user_id: userId }]);
    if (officeName === "DEFAULT") {
      setRoute(defaultRoute);
    } else {
      if (!isOfficeInRoute(officeName)) {
        setRoute([...route, { office_name: officeName, user_id: userId }]);
      }
    }
  };

  const handleDocumentType = (e) => {
    const selectedId = e.target.value;

    if (selectedId) {
      const selectedDocumentType = documentType.find(
        (type) => type.id === parseInt(selectedId)
      );

      const formattedDocumentType = {
        ...selectedDocumentType,
        route: JSON.parse(selectedDocumentType.route), // Stringify the route array
      };

      if (formattedDocumentType) {
        setDocumentType(formattedDocumentType.document_type);
        setDeadline(
          formattedDocumentType?.deadline
            ? formattedDocumentType?.deadline
            : null
        );
        // Ensure that route is always an array
        const updatedRoute = Array.isArray(formattedDocumentType.route)
          ? formattedDocumentType.route.map((routeItem) => {
              // Separate conditions for FACULTY and REGISTRAR
              if (
                routeItem.office_name === "FACULTY" &&
                user.role === rolesList.faculty
              ) {
                return {
                  ...routeItem,
                  office_name: esuCampus ? `${esuCampus} FACULTY` : "FACULTY",
                  user_id: facultyId, // Assign facultyId for FACULTY
                };
              } else if (routeItem.office_name === "REGISTRAR" && registrarId) {
                return {
                  ...routeItem,
                  office_name: esuCampus
                    ? `${esuCampus} REGISTRAR`
                    : "REGISTRAR",
                  user_id: registrarId, // Assign registrarId for REGISTRAR
                };
              }
              return routeItem;
            })
          : [];

        setRoute(updatedRoute);
        setDefaultRoute(updatedRoute);
      }
    } else {
      setDocumentType("");
      setRoute([]);
    }
  };

  const handleDeleteOffice = (officeName) => {
    const newRoute = route.filter(
      (office) => office.office_name !== officeName
    );
    setRoute(newRoute);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUploadDocument = async (e) => {
    setTrackingNumberError("");
    setDocumentNameError("");
    setDocumentTypeError("");
    // setRouteError("");
    setFileTypeError("");
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append("tracking_number", trackingNumber);
    formData.append("document_name", document_name);
    formData.append("document_desc", document_desc);
    formData.append("document_type", document_type);
    formData.append("deadline", deadline);
    formData.append("file_type", file_type);
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles.length > 0) {
        formData.append("files", selectedFiles[i]);
      } else {
        formData.append("files", null);
      }
    }

    formData.append("uploaded_by", uploaded_by);
    formData.append("contact_number", contact_number);
    formData.append("esuCampus", esuCampus);
    formData.append("user_id", user_id);
    formData.append("user_email", user?.email);
    formData.append("route", JSON.stringify(route));
    formData.append("action", "uploaded");

    try {
      const response = await api.post("/document/upload", formData);
      console.log(response.data);
      if (response.data.status === "success") {
        // socket
        socket.emit("upload_document", response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          setLoading(false);
          navigate(`/document/tracking-number/${trackingNumber}`);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error);
      console.log(error.response.data);
      if (error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          switch (error.path) {
            case "tracking_number":
              setTrackingNumberError(error.msg);
              break;
            case "document_name":
              setDocumentNameError(error.msg);
              break;
            case "document_type":
              setDocumentTypeError(error.msg);
              break;
            // case "route":
            //   setRouteError(error.msg);
            //   break;
            case "file_type":
              setFileTypeError(error.msg);
              break;
            default:
              console.log(error);
          }
        });
      }
    }
  };

  return (
    <div className="bg-white ">
      {" "}
      <div className="flex items-center gap-5">
        <Back />

        <h1 className="font-bold md:text-2xl text-lg  text-gray-900">
          {" "}
          Upload Documents
        </h1>
      </div>
      <div className="shadow-lg w-full flex items-center justify-center bg-white border-2 rounded-md md:max-w-2xl mt-10 p-4 max-w-xl mx-auto ">
        {loading && <Loading />}
        <form
          action=""
          method="POST"
          encType="multipart/form-data"
          className="w-full "
          onSubmit={handleUploadDocument}
        >
          <h1 className="text-gray-700 font-bold md:text-xl text-lg">
            Document Information
          </h1>

          <div className=" mb-5 mt-4 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tracking Code
            </label>
            <div className="flex flex-grow relative ">
              <input
                type="text"
                id="tracking"
                name="tracking_number"
                className={`flex flex-grow ${
                  trackingNumberError ? "border-red-500" : "border-gray-300"
                } bg-gray-200 border-1 border-gray-300 text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder="Tracking Number"
                value={trackingNumber}
                disabled={true}
              />
              <button
                type="button"
                onClick={() => generageTrackingNumber()}
                className="absolute right-0 px-4 w-fit h-full bg-main hover:bg-main_hover  text-white"
              >
                Generate Code
              </button>
            </div>
            {trackingNumberError && (
              <span className="text-red-500 text-sm">
                {trackingNumberError}
              </span>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Uploaded By
            </label>
            <input
              type="text"
              id="uploaded"
              className="bg-gray-200 border w-full border-gray-300 text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled={true}
              defaultValue={`${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setDocumentName(e.target.value)}
              className={` ${
                documentNameError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
              placeholder="Enter document name"
              required
            />
            {documentNameError && (
              <span className="text-red-500 text-sm">{documentNameError}</span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Type
            </label>
            <select
              id="type"
              className={` ${
                documentTypeError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder="Enter document name"
              required
              onChange={handleDocumentType}
            >
              <option value="">Select document type</option>
              {documentType?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.document_type}
                </option>
              ))}
            </select>
            {documentTypeError && (
              <span className="text-red-500 text-sm">{documentTypeError}</span>
            )}
          </div>

          {route.length > 0 && (
            <div className="mb-5 relative">
              <label
                htmlFor="route"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Document Route
              </label>
              <DocumentRoute
                route={route}
                handleSelectOffice={handleSelectOffice}
                campus={esuCampus}
                registrarId={registrarId}
                facultyId={facultyId}
              />
              {route?.length > 0 && (
                <div className="flex items-center  justify-center">
                  <ol className="relative  right-0 text-gray-600 border-l-4 border-yellow ">
                    {route?.map(({ office_name }, index) => (
                      <li key={index} className="last:mb-0 mb-10 ms-6">
                        <span
                          className="absolute flex items-center justify-center w-8 h-8 bg-red-300
                 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-blue-500 dark:text-green-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>

                        <p className="font-bold hover:bg-gray-300 px-2 rounded-sm py-1 flex w-full justify-between items-center text-[12px] ">
                          {office_name}
                          <span
                            onClick={() => handleDeleteOffice(office_name)}
                            className="text-xl cursor-pointer text-red-500 hover:bg-gray-400 rounded-sm ml-20"
                          >
                            <MdDelete />
                          </span>
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              File Type
            </label>
            <select
              onChange={(e) => {
                setFileType(e.target.value);
                file_type === "Hard Copy" && setSelectedFiles([]);
              }}
              id="file_type"
              className={`${
                fileTypeError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder="Enter document name"
              required
            >
              <option value="">Select File type</option>
              <option value="Soft Copy">Soft Copy</option>
              <option value="Hard Copy">Hard Copy</option>
            </select>
            {fileTypeError && (
              <span className="text-red-500 text-sm">{fileTypeError}</span>
            )}
          </div>

          {file_type === "Soft Copy" && (
            <div className="mb-5">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-62 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, PPT, DOC, DOCX, CSV, JPEG, PNG, GIF
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    multiple
                    name="files"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {selectedFiles.length > 0 && (
                <ul className="mt-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Description (Optional)
            </label>
            <textarea
              type="text"
              id="name"
              rows={5}
              onChange={(e) => setDocumentDesc(e.target.value)}
              className="bg-gray-200 border w-full border-gray-300 text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Enter document description"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg mr-4"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadDocument}
              type="submit"
              className="px-10 py-2 bg-main hover:bg-main_hover text-white rounded-lg"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocuments;
