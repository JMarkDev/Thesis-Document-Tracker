import { useState } from "react";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileModal from "../ProfileModal";
import api from "../../api/axios";
import userIcon from "../../assets/images/user (1).png";
import DeleteModal from "../DeleteModal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../services/usersSlice";
import { toastUtils } from "../../hooks/useToast";
import EditCampusAdmin from "../../pages/Admin/UserMagement/CampusAdmin/EditCampusAdmin";

const CampusAdminTable = ({ campusAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEsuCampus, setSelectedEsuCampus] = useState(null);
  const [name, setName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const openEditModal = (id) => {
    setSelectedUser(id);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
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

              <th scope="col" className="px-6 py-3 ">
                <div className="flex items-center justify-center  whitespace-nowrap">
                  ACTION
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {campusAdmin?.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  middleInitial,
                  image,
                  esuCampus,
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
                  <td className="px-6 py-4 whitespace-nowrap">{esuCampus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{email}</td>

                  <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <Link
                      to={`/user-details/${id}`}
                      className="p-2 md:text-lg text-sm border bg-gray-200 border-[#c9872a] hover:bg-gray-300 text-[#c9872a] rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </Link>

                    <button
                      onClick={(e) => {
                        openEditModal(id);
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm border border-blue-500 bg-gray-200  hover:bg-gray-300 text-blue-700 rounded-lg"
                    >
                      <FaRegEdit className="h-5 w-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        openDeleteModal({
                          id,
                          name: `${firstName} ${middleInitial}. ${lastName}`,
                        });
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm border border-red-500 bg-gray-200  hover:bg-gray-300 text-red-700 rounded-lg"
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>

                    {}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {editModal && (
          <EditCampusAdmin
            modal={editModal}
            closeModal={closeEditModal}
            id={selectedUser}
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

CampusAdminTable.propTypes = {
  campusAdmin: PropTypes.array.isRequired,
};

export default CampusAdminTable;
