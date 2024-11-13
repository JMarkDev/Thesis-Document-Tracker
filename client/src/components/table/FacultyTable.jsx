import { useState } from "react";
import { FaTrashAlt, FaEye, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileModal from "../ProfileModal";
import api from "../../api/axios";
import userIcon from "../../assets/images/user (1).png";
import DeleteModal from "../DeleteModal";
import { useDispatch } from "react-redux";
import { deleteUser, approveFaculty } from "../../services/usersSlice";
import { toastUtils } from "../../hooks/useToast";
import { getStatus } from "../../utils/getStatus";
import statusList from "../../constants/statusList";
import Loading from "../loader/loginloader/LoginLoading";
import NoData from "../NoData";

const FacultyTable = ({ faculty, handleFetchFaculty }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEsuCampus, setSelectedEsuCampus] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const openDeleteModal = ({ id, name }) => {
    setName(name);
    setSelectedEsuCampus(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedEsuCampus(null);
  };

  const handleDelete = () => {
    dispatch(deleteUser({ id: selectedEsuCampus, toast: toastUtils() }));
    closeDeleteModal();
    if (handleFetchFaculty) {
      handleFetchFaculty();
    }
  };

  const handleApprove = ({ id, email }) => {
    setLoading(true);
    dispatch(approveFaculty({ id, email, toast: toastUtils() }))
      .unwrap()
      .then(() => {
        setLoading(false);
        if (handleFetchFaculty) {
          handleFetchFaculty();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-center">{loading && <Loading />}</div>

        {faculty.length === 0 ? (
          <NoData />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center  whitespace-nowrap">
                  OFFICE ID
                </div>
              </th> */}
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    IMAGE
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center  whitespace-nowrap">
                    FULL NAME
                  </div>
                </th>
                {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center  whitespace-nowrap">
                  DESIGNATION
                </div>
              </th> */}
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    ESU CAMPUS
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    EMAIL
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    STATUS
                  </div>
                </th>

                <th scope="col" className="px-6 py-3 ">
                  <div className="flex items-center justify-center  whitespace-nowrap">
                    ACTION
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {faculty?.map(
                (
                  {
                    id,
                    firstName,
                    lastName,
                    middleInitial,
                    // designation,
                    image,
                    esuCampus,
                    email,
                    status,
                  },
                  index
                ) => (
                  <tr
                    onClick={() => navigate(`/user-details/${id}`)}
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                  >
                    {/* <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th> */}
                    <th
                      scope="row"
                      className=" font-medium text-gray-900 whitespace-nowrap dark:text-white "
                    >
                      <div className="flex items-center justify-center">
                        <img
                          onClick={() => openModal(image)}
                          src={`${
                            image ? `${api.defaults.baseURL}${image}` : userIcon
                          }`}
                          alt=""
                          className="h-10 w-10 rounded-full cursor-pointer"
                        />
                        {showModal && (
                          <ProfileModal
                            data={selectedImage}
                            modal={showModal}
                            closeModal={closeModal}
                          />
                        )}
                      </div>
                    </th>

                    <td className="px-6 py-4 whitespace-nowrap">{`${firstName} ${middleInitial}. ${lastName}`}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{designation}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">{esuCampus}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{email}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <span
                        className={`${
                          status === statusList.verified
                            ? "bg-[#f3e887]"
                            : "bg-green-400"
                        }  text-gray-700 p-2 px-4 rounded-lg`}
                      >
                        {status === statusList.verified
                          ? "pending"
                          : getStatus(status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-center items-center relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove({ id, email });
                        }}
                        className={`${
                          status === statusList.verified
                            ? "vissible"
                            : "invisible"
                        } p-2 text-lg bg-green-500 hover:bg-green-800 text-white rounded-lg`}
                      >
                        <FaCheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user-details/${id}`);
                        }}
                        className="p-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          openDeleteModal({
                            id,
                            name: `${firstName} ${middleInitial}. ${lastName}`,
                          });
                          e.stopPropagation();
                        }}
                        className="p-2 text-lg hover:bg-red-700 bg-red-500 text-white rounded-lg"
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                    </td>
                    {/* <td className=" py-4 flex gap-3 justify-center items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user-details/${id}`);
                      }}
                      className="p-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => openDeleteModal(id)}
                      className="p-2 text-lg hover:bg-red-700 bg-red-500 text-white rounded-lg"
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                    {deleteModal && (
                      <DeleteModal
                        title={`${firstName} ${middleInitial}. ${lastName}`}
                        deleteModal={deleteModal}
                        closeDeleteModal={closeDeleteModal}
                        handleDelete={handleDelete}
                      />
                    )}
                    {}
                  </td> */}
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
        {deleteModal && (
          <DeleteModal
            title={name}
            deleteModal={deleteModal}
            closeDeleteModal={closeDeleteModal}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

FacultyTable.propTypes = {
  faculty: PropTypes.array.isRequired,
  handleFetchFaculty: PropTypes.func,
};

export default FacultyTable;
