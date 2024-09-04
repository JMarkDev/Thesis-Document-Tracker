import rolesList from "../constants/rolesList";

export const getUserRole = (role) => {
  let userRole;

  switch (role) {
    case rolesList.faculty:
      userRole = "faculty";
      break;
    case rolesList.campus_admin:
      userRole = "campus admin";
      break;
    case rolesList.registrar:
      userRole = "registrar";
      break;
    case rolesList.admin:
      userRole = "admin";
      break;
    case rolesList.office:
      userRole = "office";
      break;
    default:
      break;
  }
  return userRole;
};
