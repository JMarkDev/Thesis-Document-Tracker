import { useState } from "react";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileModal from "../ProfileModal";
import api from "../../api/axios";
import userIcon from "../../assets/images/user (1).png";
import DeleteModal from "../DeleteModal";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../../services/staffSlice";
import { toastUtils } from "../../hooks/useToast";
import EditAdminStaff from "../../pages/Admin/UserMagement/AdminStaff/EditAdminStaff";

const AdminTable = ({ adminUser, handleFetchUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selecedOffice, setSelectedOffice] = useState(null);

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
  };

  const openEditModal = (id) => {
    setSelectedUser(id);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleDelete = () => {
    // dispatch(deleteUser({ id: selectedEsuCampus, toast: toastUtils() }));
    dispatch(deleteStaff({ email: selecedOffice, toast: toastUtils() }))
      .then(() => {
        handleFetchUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
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
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">
                  DESIGNATION
                </div>
              </th>
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
            {adminUser?.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  middleInitial,
                  image,
                  designation,
                  email,
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
                  <td className="px-6 py-4 whitespace-nowrap">{designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{email}</td>

                  {/* <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user-details/${id}`);
                      }}
                      className=" p-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        openEditModal(id);
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm  bg-[#3577c2] hover:bg-[#2d4199] text-white rounded-lg"
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
                      className="p-2 md:text-lg text-sm hover:bg-red-700 bg-red-500 text-white rounded-lg"
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>

                    {}
                  </td> */}
                  <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user-details/${id}`);
                        }}
                        className="p-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                      </span>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          openEditModal(id);
                          e.stopPropagation();
                        }}
                        className="p-2 md:text-lg text-sm bg-[#3577c2] hover:bg-[#2d4199] text-white rounded-lg"
                      >
                        <FaRegEdit className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Edit
                      </span>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          openDeleteModal({
                            email,
                            name: `${firstName} ${middleInitial}. ${lastName}`,
                          });
                          e.stopPropagation();
                        }}
                        className="p-2 md:text-lg text-sm hover:bg-red-700 bg-red-500 text-white rounded-lg"
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {editModal && (
          <EditAdminStaff
            modal={editModal}
            closeModal={closeEditModal}
            id={selectedUser}
            handleFetchUpdate={handleFetchUpdate}
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

AdminTable.propTypes = {
  adminUser: PropTypes.array.isRequired,
  handleFetchUpdate: PropTypes.func,
};

export default AdminTable;
