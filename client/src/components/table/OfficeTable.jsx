import { useEffect, useState } from "react";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  getOfficeUsers,
  getOfficeStatus,
  getUserError,
} from "../../services/usersSlice";
import api from "../../api/axios";
import ProfileModal from "../profileModal";

const Office = () => {
  const dispatch = useDispatch();
  const officeUsers = useSelector(getOfficeUsers);
  const officeStatus = useSelector(getOfficeStatus);
  const error = useSelector(getUserError);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (officeStatus === "idle") {
      dispatch(fetchOffice());
    }
  }, [officeStatus, dispatch]);

  if (officeStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (officeStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
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
                  OFFICE NAME
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
            {officeUsers?.map(
              (
                {
                  id,
                  firstName,
                  lastName,
                  middleInitial,
                  image,
                  officeName,
                  email,
                },
                index
              ) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100"
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
                        src={`${api.defaults.baseURL}${image}`}
                        alt=""
                        className="h-14 w-14 rounded-full cursor-pointer"
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
                  <td className="px-6 py-4 whitespace-nowrap">{officeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{email}</td>

                  <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <Link
                      to={`/documents/${id}`}
                      className="px-4 py-2 text-lg bg-[#c9872a] hover:bg-[#c27c47] text-white rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </Link>

                    <button className="px-4 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <FaRegEdit className="h-5 w-5" />
                    </button>

                    <button className="px-4 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Office;
