import { useState } from "react";
import { FaTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileModal from "../ProfileModal";
import api from "../../api/axios";
import userIcon from "../../assets/images/user (1).png";
import DeleteModal from "../DeleteModal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../services/usersSlice";
import { toastUtils } from "../../hooks/useToast";
import { getStatus } from "../../utils/getStatus";
import statusList from "../../constants/statusList";
import { BsThreeDots } from "react-icons/bs";
import { MdPreview } from "react-icons/md";

const FacultyTable = ({ fetchFaculty }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEsuCampus, setSelectedEsuCampus] = useState(null);
  const [openAction, setOpenAction] = useState(false);
  const [name, setName] = useState("");

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
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center  whitespace-nowrap">
                  DESIGNATION
                </div>
              </th>
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
            {fetchFaculty?.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  middleInitial,
                  designation,
                  image,
                  esuCampus,
                  email,
                  status,
                },
                index
              ) => (
                <tr
                  onClick={() => navigate(`/user-profile/${id}`)}
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
                  <td className="px-6 py-4 whitespace-nowrap">{designation}</td>
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
                      {getStatus(status)}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 flex gap-3 justify-center items-center relative">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          setOpenAction(id === openAction ? null : id);
                          e.stopPropagation();
                        }}
                        className="text-xl text-gray-800 font-semibold"
                      >
                        <BsThreeDots />
                      </button>
                      {openAction === id && (
                        <div
                          onMouseLeave={() => setOpenAction(null)}
                          className={`z-20 absolute flex flex-col right-[-25px] ${
                            index === fetchFaculty.length - 1 ||
                            index === fetchFaculty.length - 2
                              ? "bottom-40"
                              : "bottom-2"
                          }  w-48 py-2 mt-2 bg-white rounded-md shadow-2xl transform translate-y-full`}
                        >
                          <Link
                            to={`/user-profile/${id}`}
                            className="w-full flex text-green-700 items-center gap-2 py-2 px-4 text-left hover:bg-gray-300 dark:hover:bg-gray-700"
                          >
                            <span>
                              <MdPreview className="h-4 w-4" />
                            </span>
                            View
                          </Link>
                          <button
                            // onClick={() => openDeleteModal(id)}
                            className="w-full flex items-center gap-2 text-blue-500 py-2 px-4 text-left hover:bg-gray-300 dark:hover:bg-gray-700"
                          >
                            <span>
                              <FaRegEdit className="h-4 w-4" />
                            </span>
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              openDeleteModal({
                                id,
                                name: `${firstName} ${middleInitial}. ${lastName}`,
                              });
                              e.stopPropagation();
                            }}
                            className="w-full flex items-center gap-2 text-red-500 py-2 px-4 text-left hover:bg-gray-300 dark:hover:bg-gray-700"
                          >
                            <span>
                              <FaTrashAlt className="h-4 w-4" />
                            </span>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td> */}

                  <td className=" py-4 flex gap-3 justify-center items-center">
                    <Link
                      to={`/user-profile/${id}`}
                      className="p-2 md:text-lg text-sm border bg-gray-200 border-[#c9872a] hover:bg-gray-300 text-[#c9872a] rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </Link>

                    <button
                      onClick={() => openDeleteModal(id)}
                      className="p-2 md:text-lg text-sm border border-red-500 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-lg"
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
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
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
  fetchFaculty: PropTypes.array.isRequired,
};

export default FacultyTable;
