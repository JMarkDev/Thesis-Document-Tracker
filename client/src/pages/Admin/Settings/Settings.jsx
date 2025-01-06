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

import {
  addProgram,
  fetchPrograms,
  deleteProgram,
  updateProgram,
} from "../../../services/programSlice"; // Import program actions

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

  const { programs: programList, status: programStatus } = useSelector(
    (state) => state.program
  );

  const [newDesignation, setNewDesignation] = useState("");
  const [editDesignation, setEditDesignation] = useState({
    id: null,
    name: "",
  });

  const [newCampus, setNewCampus] = useState(""); // State for new campus
  const [editCampus, setEditCampus] = useState({ id: null, name: "" }); // State for editing campus

  const [newProgram, setNewProgram] = useState({
    name: "",
    abbreviation: "",
  });
  const [editProgram, setEditProgram] = useState({
    id: null,
    name: "",
    abbreviation: "",
  });

  useEffect(() => {
    dispatch(fetchDesignation());
    dispatch(fetchEsuCampuses()); // Fetch campuses on mount
    dispatch(fetchPrograms());
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

  // Handling Program CRUD operations
  const handleAddProgram = () => {
    console.log(newProgram);
    if (newProgram.name.trim() && newProgram.abbreviation.trim()) {
      dispatch(addProgram({ newProgram, toast: toastUtils() }));
      setNewProgram({ name: "", abbreviation: "" });
    }
  };

  const handleEditProgram = (program) => {
    setEditProgram(program);
  };

  const handleUpdateProgram = () => {
    if (editProgram.name.trim() && editProgram.abbreviation.trim()) {
      dispatch(updateProgram({ editProgram, toast: toastUtils() }));
      setEditProgram({ id: null, name: "", abbreviation: "" });
    }
  };

  const handleDeleteProgram = (id) => {
    dispatch(deleteProgram({ id: id, toast: toastUtils() }));
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
                      <div className="relative flex items-center gap-2">
                        <div className="relative group">
                          <button
                            type="button"
                            onClick={() => handleEditDesignation(designation)}
                            className="p-2 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                          >
                            <FaEdit />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Edit
                          </span>
                        </div>
                        <div className="relative group">
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteDesignation(designation.id)
                            }
                            className="p-2 text-lg bg-red-500 hover:bg-red-600 text-white rounded-lg"
                          >
                            <MdDelete />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Delete
                          </span>
                        </div>
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
                      <div className="relative flex gap-4">
                        <div className="relative group flex  items-center">
                          <button
                            type="button"
                            onClick={() => handleEditCampus(campus)}
                            className="p-2 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                          >
                            <FaEdit />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Edit
                          </span>
                        </div>
                        <div className="relative group flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteCampus(campus.id)}
                            className="p-2 text-lg bg-red-500 hover:bg-red-600 text-white rounded-lg"
                          >
                            <MdDelete />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Delete
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Program Container */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">WMSU-ESU Programs</h2>
        {/* Add New Program */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-white shadow-md rounded-lg">
          <div className="w-1/4">
            <label
              htmlFor="abbreviation"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Abbreviation
            </label>
            <input
              type="text"
              id="abbreviation"
              value={newProgram.abbreviation}
              onChange={(e) =>
                setNewProgram({ ...newProgram, abbreviation: e.target.value })
              }
              placeholder="BSCS"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="programName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Program Name
            </label>
            <input
              type="text"
              id="programName"
              value={newProgram.name}
              onChange={(e) =>
                setNewProgram({ ...newProgram, name: e.target.value })
              }
              placeholder="Bachelor of Science in Computer Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={handleAddProgram}
            className="mt-5 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            Add
          </button>
        </div>

        {/* Program List */}
        {programStatus === "loading" ? (
          <p className="text-gray-500">Loading programs...</p>
        ) : (
          <ul className="space-y-4">
            {programList?.map((program) => (
              <li
                key={program.id}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
              >
                {editProgram.id === program.id ? (
                  <div className="flex items-center gap-4 w-full">
                    <input
                      type="text"
                      value={editProgram.abbreviation}
                      onChange={(e) =>
                        setEditProgram({
                          ...editProgram,
                          abbreviation: e.target.value,
                        })
                      }
                      className="w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editProgram.name}
                      onChange={(e) =>
                        setEditProgram({
                          ...editProgram,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      type="button"
                      onClick={handleUpdateProgram}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditProgram({
                          id: null,
                          name: "",
                          abbreviation: "",
                        })
                      }
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    {/* <span>{program.name}</span> */}
                    <span>
                      {program.abbreviation} ({program.name})
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="relative flex gap-4">
                        <div className="relative group flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => handleEditProgram(program)}
                            className="p-2 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                          >
                            <FaEdit />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Edit
                          </span>
                        </div>
                        <div className="relative group flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteProgram(program.id)}
                            className="p-2 text-lg bg-red-500 hover:bg-red-600 text-white rounded-lg"
                          >
                            <MdDelete />
                          </button>
                          <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Settings;
