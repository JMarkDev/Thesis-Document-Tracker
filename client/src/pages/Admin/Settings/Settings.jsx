import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDesignation,
  deleteDesignation,
  addDesignation,
  updateDesignation,
} from "../../../services/designationSlice";
import {
  fetchEsuCampuses, // Import campus actions
  deleteEsuCampus, // Import delete campus action
  addEsuCampus, // Import add campus action
  updateEsuCampus, // Import update campus action
} from "../../../services/campusSlice";
import { toastUtils } from "../../../hooks/useToast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Settings = () => {
  const dispatch = useDispatch();
  const { designationList, status: designationStatus } = useSelector(
    (state) => state.designation
  );
  const { campusList, status: campusStatus } = useSelector(
    (state) => state.campus
  );

  const [newDesignation, setNewDesignation] = useState("");
  const [editDesignation, setEditDesignation] = useState({
    id: null,
    name: "",
  });

  const [newCampus, setNewCampus] = useState(""); // State for new campus
  const [editCampus, setEditCampus] = useState({ id: null, name: "" }); // State for editing campus

  useEffect(() => {
    dispatch(fetchDesignation());
    dispatch(fetchEsuCampuses()); // Fetch campuses on mount
  }, [dispatch]);

  const handleAddDesignation = () => {
    if (newDesignation.trim()) {
      dispatch(addDesignation({ name: newDesignation, toast: toastUtils() }));
      setNewDesignation("");
    }
  };

  const handleEditDesignation = (designation) => {
    setEditDesignation(designation);
  };

  const handleUpdateDesignation = () => {
    if (editDesignation.name.trim()) {
      dispatch(updateDesignation({ editDesignation, toast: toastUtils() }));
      setEditDesignation({ id: null, name: "" });
    }
  };

  const handleDeleteDesignation = (id) => {
    dispatch(deleteDesignation({ id: id, toast: toastUtils() }));
  };

  // Handling Campus CRUD operations
  const handleAddCampus = () => {
    if (newCampus.trim()) {
      dispatch(addEsuCampus({ name: newCampus, toast: toastUtils() }));
      setNewCampus("");
    }
  };

  const handleEditCampus = (campus) => {
    setEditCampus(campus);
  };

  const handleUpdateCampus = () => {
    if (editCampus.name.trim()) {
      dispatch(updateEsuCampus({ editCampus, toast: toastUtils() }));
      setEditCampus({ id: null, name: "" });
    }
  };

  const handleDeleteCampus = (id) => {
    dispatch(deleteEsuCampus({ id: id, toast: toastUtils() }));
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Designation Container */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Designations</h2>
          {/* Add New Designation */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              placeholder="Add new designation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddDesignation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Designation List */}
          {designationStatus === "loading" ? (
            <p className="text-gray-500">Loading designations...</p>
          ) : (
            <ul className="space-y-4">
              {designationList.map((designation) => (
                <li
                  key={designation.id}
                  className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                >
                  {editDesignation.id === designation.id ? (
                    <div className="flex items-center gap-4 w-full">
                      <input
                        type="text"
                        value={editDesignation.name}
                        onChange={(e) =>
                          setEditDesignation({
                            ...editDesignation,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleUpdateDesignation}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setEditDesignation({ id: null, name: "" })
                        }
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{designation.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditDesignation(designation)}
                          className="p-2 text-lg bg-yellow-500 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:bg-yellow-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteDesignation(designation.id)
                          }
                          className="p-2 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Campus Container */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">WMSU-ESU CAMPUS</h2>
          {/* Add New Campus */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              value={newCampus}
              onChange={(e) => setNewCampus(e.target.value)}
              placeholder="Add new campus"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCampus}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Campus List */}
          {campusStatus === "loading" ? (
            <p className="text-gray-500">Loading campuses...</p>
          ) : (
            <ul className="space-y-4">
              {campusList.map((campus) => (
                <li
                  key={campus.id}
                  className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                >
                  {editCampus?.id === campus.id ? (
                    <div className="flex items-center gap-4 w-full">
                      <input
                        type="text"
                        value={editCampus.name}
                        onChange={(e) =>
                          setEditCampus({
                            ...editCampus,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleUpdateCampus}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditCampus({ id: null, name: "" })}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{campus.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditCampus(campus)}
                          className="p-2 text-lg bg-yellow-500 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:bg-yellow-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCampus(campus.id)}
                          className="p-2 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
