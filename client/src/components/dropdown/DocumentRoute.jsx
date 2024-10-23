import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  fetchAdmin,
  getRoleStatus,
  getRoleUsers,
} from "../../services/usersSlice";
import PropTypes from "prop-types";

const DocumentRoute = ({
  route,
  handleSelectOffice,
  campus,
  registrarId,
  facultyId,
}) => {
  const dispatch = useDispatch();
  const officeUsers = useSelector(getRoleUsers("office"));
  const officeStatus = useSelector(getRoleStatus("office"));
  const adminStatus = useSelector(getRoleStatus("admin"));
  // const registrarUser = useSelector(getRoleUsers("registrar"));
  const registrarStatus = useSelector(getRoleStatus("registrar"));
  const [selectedRoute, setSelectedRoute] = useState("");
  // const [officeData, setOfficeData] = useState([]);
  // // const [officeRoute, setRoute] = useState([]);

  // useEffect(() => {
  //   let office = officeUsers.map((office) => {
  //     return { office_name: office.office.officeName, user_id: office.id };
  //   });

  //   let registrar = registrarUser?.map((registrar) => {
  //     return {
  //       office_name: `${registrar.esuCampus} REGISTRAR`,
  //       user_id: registrar.id,
  //     };
  //   });

  //   // console.log(route);
  //   // setRoute([...route, ...registrar]);
  //   setOfficeData([...office, ...registrar]);
  // }, [officeUsers, registrarUser]);

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
    if (officeName === "FACULTY" || officeName === "REGISTRAR") {
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
    } else {
      const officeUser = officeUsers.find(
        (office) => office.office.officeName === selectedOffice
      );
      if (officeUser) {
        handleSelectOffice(officeUser.office.officeName, officeUser.id);
      }
    }

    // if (selectedOffice) {
    // officeData?.map((office) => {
    //   if (office.office_name === selectedOffice) {
    //     handleSelectOffice(`${office.office_name}`, office.user_id);
    //   }
    // });
    // }

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
      <option value="FACULTY" disabled={isDisabled("FACULTY")}>
        {campus} FACULTY
      </option>
      <option value="REGISTRAR" disabled={isDisabled("REGISTRAR")}>
        {campus} REGISTRAR
      </option>
      {officeUsers?.map((office) => (
        <option
          key={office.id}
          value={office.office.officeName}
          disabled={isOfficeInRoute(office.office.officeName)}
        >
          {office.office.officeName}
        </option>
      ))}
      {/* {officeData?.map((office) => (
        <option
          key={office.user_id}
          value={office.office_name}
          disabled={isOfficeInRoute(office.office_name)}
        >
          {office.office_name}
        </option>
      ))} */}
    </select>
  );
};

DocumentRoute.propTypes = {
  route: PropTypes.array.isRequired,
  handleSelectOffice: PropTypes.func.isRequired,
  campus: PropTypes.string,
  registrarId: PropTypes.number,
  facultyId: PropTypes.number,
};

export default DocumentRoute;
