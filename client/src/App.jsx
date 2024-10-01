import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import rolesList from "./constants/rolesList";
// import useIdleTimeout from "./hooks/useIdleTimeout";

import ProtectedRoute from "./route/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

import Homepage from "./pages/Homepage";
import ScanNow from "./pages/Admin/ScanNow/ScanNow";

import LayoutAdmin from "./components/layout/LayoutAdmin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Documents from "./pages/Admin/Documents/Documents";
import DocumentWorkflow from "./pages/Admin/DocumentWorkflows/DocumentWorkflow";
// import WorkflowDetails from "./pages/Admin/DocumentWorkflows/WorkflowDetails";
import Offices from "./pages/Admin/Offices/Offices";
import Reports from "./pages/Admin/Reports/Reports";
import Faculty from "./pages/Admin/UserMagement/Faculty/Faculty";
import CampusAdmin from "./pages/Admin/UserMagement/CampusAdmin/CampusAdmin";
import EsuRegistrar from "./pages/Admin/UserMagement/ESU Registrar/EsuRegistrar";
import AdminStaff from "./pages/Admin/UserMagement/AdminStaff/AdminStaff";

import LayoutFaculty from "./components/layout/LayoutFaculty";
import Upload from "./pages/Faculty/UploadDocuments/UploadDocuments";
import FacultyReports from "./pages/Faculty/Reports/FacultyReports";
import AllDocuments from "./pages/Faculty/AllDocuments/AllDocuments";

import UserProfile from "./pages/Shared/UserProfile";
import UserDetails from "./pages/Shared/UserDetails";
import DocumentDetails from "./pages/Shared/DocumentDetails";

function App() {
  // useIdleTimeout();
  // console.log(useIdleTimeout());
  const adminLinks = [
    { title: "Dashboard", path: "/dashboard", component: <Dashboard /> },
    { title: "Scan Now", path: "/scan-now", component: <ScanNow /> },
    { title: "Documents", path: "/documents", component: <Documents /> },
    {
      title: "Document Workflow",
      path: "/document-workflow",
      component: <DocumentWorkflow />,
    },
    // {
    //   title: "Document Workflow Details",
    //   path: "/document-workflow/:id",
    //   component: <WorkflowDetails />,
    // },
    { title: "Offices", path: "/offices", component: <Offices /> },
    { title: "Reports", path: "/reports", component: <Reports /> },
    { title: "Faculty", path: "/users/faculty", component: <Faculty /> },
    {
      title: "Campus Admin",
      path: "/users/campus-admin",
      component: <CampusAdmin />,
    },
    {
      title: "ESU Registrar",
      path: "/users/esu-registrar",
      component: <EsuRegistrar />,
    },
    {
      title: "Admin Staff",
      path: "/users/admin-staff",
      component: <AdminStaff />,
    },
    {
      title: "Faculty",
      path: "/users/faculty",
      component: <Faculty />,
    },
    {
      title: "Document Details",
      path: "/document/details/:id",
      component: <DocumentDetails />,
    },
    {
      title: "User Details",
      path: "/user-details/:id",
      component: <UserDetails />,
    },
    {
      title: "User Profile",
      path: "/user-profile",
      component: <UserProfile />,
    },
  ];

  const facultyLinks = [
    {
      title: "Faculty Profile",
      path: "/faculty-profile",
      component: <UserProfile />,
    },
    {
      title: "Upload",
      path: "/faculty-upload-documents",
      component: <Upload />,
    },
    {
      title: "Reports",
      path: "/faculty-reports",
      component: <FacultyReports />,
    },
    {
      title: "Uploaded Documents",
      path: "/faculty-all-documents",
      component: <AllDocuments />,
    },
  ];

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        {adminLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              <ProtectedRoute
                element={<LayoutAdmin>{link.component}</LayoutAdmin>}
                allowedRoles={[rolesList.admin]}
              />
            }
          />
        ))}

        {facultyLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            // element={<LayoutFaculty>{link.component}</LayoutFaculty>}
            element={
              <ProtectedRoute
                element={<LayoutFaculty>{link.component}</LayoutFaculty>}
                allowedRoles={[rolesList.faculty]}
              />
            }
          />
        ))}

        {/* Not found page */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
