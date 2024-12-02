import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  fetchAdmin,
  getRoleStatus,
  getRoleUsers,
  faculty,
  filterFacultyByCampus,
} from "../../services/usersSlice";
import PropTypes from "prop-types";
import { getUserData } from "../../services/authSlice";
import rolesList from "../../constants/rolesList";

const DocumentRoute = ({
  route,
  handleSelectOffice,
  campus,
  registrarId,
  campusAdminId,
  facultyId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const officeUsers = useSelector(getRoleUsers("office"));
  const officeStatus = useSelector(getRoleStatus("office"));
  const facultyUser = useSelector(faculty);
  const adminStatus = useSelector(getRoleStatus("admin"));
  const registrar = useSelector(getRoleUsers("registrar"));
  const campusAdmin = useSelector(getRoleUsers("campus_admin"));
  const registrarStatus = useSelector(getRoleStatus("registrar"));
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [campusData, setCampusData] = useState([]);

  useEffect(() => {
    if (
      user?.role === rolesList.admin ||
      user?.role === rolesList.admin_staff
    ) {
      setIsAdmin(true);
    }

    if (registrar && campusAdmin) {
      setCampusData([...registrar, ...campusAdmin]);
    }
  }, [user, registrar, campusAdmin]);

  useEffect(() => {
    if (
      user?.role === rolesList.campus_admin ||
      user?.role === rolesList.registrar
    ) {
      dispatch(
        filterFacultyByCampus({
          esuCampus: user?.esuCampus,
          role: rolesList.faculty,
        })
      );
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (officeStatus === "idle") {
      dispatch(fetchOffice());
    }

    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }

    if (registrarStatus === "idle") {
      dispatch(fetchAdmin());
    }
  }, [officeStatus, adminStatus, registrarStatus, dispatch]);

  const isOfficeInRoute = (officeName) => {
    return route.some((office) => office.office_name === officeName);
  };

  const isDisabled = (officeName) => {
    // Disable only if the route contains a specific office and the campus is not matched
    if (
      officeName === "FACULTY" ||
      officeName === "REGISTRAR" ||
      officeName === "CAMPUS ADMIN"
    ) {
      return isOfficeInRoute(`${campus} ${officeName}`);
    }
    return isOfficeInRoute(officeName);
  };

  const handleChange = (event) => {
    const selectedOffice = event.target.value;

    if (selectedOffice === "DEFAULT") {
      if (!isOfficeInRoute("DEFAULT")) {
        handleSelectOffice("DEFAULT", null);
      }
    } else if (selectedOffice === "FACULTY") {
      if (!isOfficeInRoute("FACULTY")) {
        handleSelectOffice(
          campus ? `${campus} FACULTY` : "FACULTY",
          facultyId || null
        );
      }
    } else if (selectedOffice === "REGISTRAR") {
      if (!isOfficeInRoute("REGISTRAR")) {
        handleSelectOffice(
          campus ? `${campus} REGISTRAR` : "REGISTRAR",
          registrarId || null
        );
      }
    } else if (selectedOffice === "CAMPUS ADMIN") {
      if (!isOfficeInRoute("CAMPUS ADMIN")) {
        handleSelectOffice(
          campus ? `${campus} CAMPUS ADMIN` : "CAMPUS ADMIN",
          campusAdminId || null
        );
      }
    } else if (selectedOffice.includes("CAMPUS ADMIN")) {
      const campusAdminUser = campusAdmin.find(
        (admin) => admin.esuCampus === selectedOffice.split(" CAMPUS ADMIN")[0]
      );

      if (campusAdminUser) {
        handleSelectOffice(selectedOffice, campusAdminUser.id);
      }
    } else if (selectedOffice.includes("REGISTRAR")) {
      const registrarUser = registrar.find(
        (registrar) =>
          registrar.esuCampus === selectedOffice.split(" REGISTRAR")[0]
      );

      if (registrarUser) {
        handleSelectOffice(selectedOffice, registrarUser.id);
      }
    } else {
      const selectedFaculty = facultyUser.find((faculty) => {
        const fullname = `${faculty.firstName} ${faculty.middleInitial}. ${faculty.lastName}`;

        return (
          fullname === selectedOffice.split(" (FACULTY)")[0] ||
          fullname === selectedOffice.split(" (FACULTY)")[0].toUpperCase()
        );
      });
      if (selectedFaculty) {
        handleSelectOffice(selectedOffice.toUpperCase(), selectedFaculty.id);
      } else {
        const officeUser = officeUsers.find(
          (office) => office.office.officeName === selectedOffice
        );
        if (officeUser) {
          handleSelectOffice(officeUser.office.officeName, officeUser.id);
        }
      }
    }

    setSelectedRoute(selectedOffice);
  };

  return (
    <select
      value={selectedRoute}
      onChange={handleChange}
      id="route"
      className="text-gray-700 border bg-gray-200 mb-5 border-gray-300  shadow-sm w-full font-medium text-sm px-5 py-2.5 rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    >
      <option value="" disabled>
        Select Route
      </option>
      <option value="DEFAULT" disabled={isOfficeInRoute("DEFAULT")}>
        DEFAULT ROUTE
      </option>
      {isAdmin ? (
        campusData?.map(({ id, role, esuCampus }) => (
          <option
            key={id}
            value={`${esuCampus} ${
              role === rolesList.campus_admin ? "CAMPUS ADMIN" : "REGISTRAR"
            }`}
            // onClick={() => handleCampusAdmin(id)}
            disabled={isOfficeInRoute(
              `${esuCampus.toUpperCase()} ${
                role === rolesList.campus_admin ? "CAMPUS ADMIN" : "REGISTRAR"
              }`
            )}
          >
            {esuCampus}{" "}
            {role === rolesList.campus_admin ? "CAMPUS ADMIN" : "REGISTRAR"}
          </option>
        ))
      ) : user?.role === rolesList.campus_admin ||
        user?.role === rolesList.registrar ? (
        <>
          {facultyUser?.map(({ id, firstName, lastName, middleInitial }) => (
            <option
              key={id}
              value={`${firstName} ${middleInitial}. ${lastName} (FACULTY)`}
              disabled={isDisabled(
                `${firstName} ${middleInitial}. ${lastName} (FACULTY)`.toUpperCase()
              )}
            >
              {`${firstName} ${middleInitial}. ${lastName} (FACULTY)`}
            </option>
          ))}
          <option value="CAMPUS ADMIN" disabled={isDisabled("CAMPUS ADMIN")}>
            {campus} CAMPUS ADMIN
          </option>
          <option value="REGISTRAR" disabled={isDisabled("REGISTRAR")}>
            {campus} REGISTRAR
          </option>
        </>
      ) : (
        <>
          <option value="FACULTY" disabled={isDisabled("FACULTY")}>
            {campus} FACULTY
          </option>
          <option value="CAMPUS ADMIN" disabled={isDisabled("CAMPUS ADMIN")}>
            {campus} CAMPUS ADMIN
          </option>
          <option value="REGISTRAR" disabled={isDisabled("REGISTRAR")}>
            {campus} REGISTRAR
          </option>
        </>
      )}

      {officeUsers?.map((office) => (
        <option
          key={office.id}
          value={office.office.officeName}
          disabled={isOfficeInRoute(office.office.officeName)}
        >
          {office.office.officeName}
        </option>
      ))}
    </select>
  );
};

DocumentRoute.propTypes = {
  route: PropTypes.array.isRequired,
  handleSelectOffice: PropTypes.func.isRequired,
  campus: PropTypes.string,
  registrarId: PropTypes.number,
  facultyId: PropTypes.number,
  campusAdminId: PropTypes.number,
};

export default DocumentRoute;
