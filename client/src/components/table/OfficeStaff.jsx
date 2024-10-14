import { useState } from "react";
import { FaRegEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../../services/staffSlice";
import api from "../../api/axios";
import ProfileModal from "../ProfileModal";
import DeleteModal from "../DeleteModal";
import { toastUtils } from "../../hooks/useToast";
import userIcon from "../../assets/images/user (1).png";
import PropTypes from "prop-types";
import EditStaff from "../../pages/Offices/Staff/EditStaff";
import NoData from "./NoData";

const OfficeStaff = ({ officeStaff, officeId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selecedOffice, setSelectedOffice] = useState(null);
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [editModal, setEditModal] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const openDeleteModal = ({ email, name }) => {
    setName(name);
    setSelectedOffice(email);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedOffice(null);
  };

  const handleDelete = async () => {
    dispatch(deleteStaff({ email: selecedOffice, toast: toastUtils() }));
    closeDeleteModal();
  };

  const handleUpdate = (id, email) => {
    setEditModal(true);
    setSelectedOffice(id);
    setEmail(email);
  };

  const closeUpdateModal = () => {
    setSelectedOffice(null);
    setEditModal(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {officeStaff.length === 0 ? (
          <NoData />
        ) : (
          <>
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
                      EMAIL
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
                {officeStaff?.map(
                  (
                    {
                      id,
                      firstName,
                      lastName,
                      middleInitial,
                      // designation,
                      image,
                      email,
                    },
                    index
                  ) => (
                    <tr
                      key={index}
                      onClick={() => navigate(`/user-details/${id}`)}
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
                              image
                                ? `${api.defaults.baseURL}${image}`
                                : userIcon
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
                      <td className="px-6 py-4 whitespace-nowrap">{email}</td>

                      <td className="px-6 py-4 flex gap-3 justify-center items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/user-details/${id}`);
                          }}
                          className="p-2 text-lg bg-[#c9872a] hover:bg-[#c27c47] text-white rounded-lg"
                        >
                          <FaEye className="h-5 w-5" />
                        </button>

                        <button
                          onClick={(e) => {
                            handleUpdate(id, email);

                            e.stopPropagation();
                          }}
                          className="p-2 text-lg bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          <FaRegEdit className="h-5 w-5" />
                        </button>

                        <button
                          onClick={(e) => {
                            openDeleteModal({
                              email,
                              name: `${firstName} ${middleInitial}. ${lastName}`,
                            });
                            e.stopPropagation();
                          }}
                          className="p-2 text-lg bg-red-500 hover:bg-red-700 text-white rounded-lg"
                        >
                          <FaTrashAlt className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}

        {editModal && (
          <EditStaff
            modal={editModal}
            closeModal={closeUpdateModal}
            id={selecedOffice}
            email={email}
            officeId={officeId}
          />
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

OfficeStaff.propTypes = {
  officeStaff: PropTypes.array.isRequired,
  officeId: PropTypes.number,
};

export default OfficeStaff;
