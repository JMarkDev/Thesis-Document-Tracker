import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import rolesList from "./constants/rolesList";
import { UseAutoLogout } from "./hooks/UseAutoLogout";

import ProtectedRoute from "./route/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

import Homepage from "./pages/Homepage";
import ScanNow from "./pages/Admin/ScanNow/ScanNow";

// import LayoutAdmin from "./components/layout/LayoutAdmin";
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

import LayoutDashboard from "./components/layout/LayoutDashboard";
// import Upload from "./pages/Faculty/UploadDocuments/UploadDocuments";
import FacultyReports from "./pages/Faculty/Reports/FacultyReports";
import AllDocuments from "./pages/Faculty/AllDocuments/AllDocuments";

import UserProfile from "./pages/Shared/UserProfile";
import UserDetails from "./pages/Shared/UserDetails";
import DocumentDetails from "./pages/Shared/DocumentDetails";
import UploadDocuments from "./pages/Shared/UploadDocuments";
import PrintQRCode from "./pages/Shared/PrintQRCode";
// import Scanner from "./components/qr_scanner/Scanner";
import EsuReports from "./pages/EsuCampus/Reports/EsuReports";
import EsuFaculties from "./pages/EsuCampus/Faculties/EsuFaculties";
import EsuDashboard from "./pages/EsuCampus/Dashboard/EsuDashboard";
import EsuDocuments from "./pages/EsuCampus/Documents/EsuDocuments";
import EsuTransmittal from "./pages/EsuCampus/Transmittal/EsuTransmittal";
import Staff from "./pages/Offices/Staff/Staff";
import OfficeDocument from "./pages/Offices/Documents/OfficeDocuments";
import OfficeDashboard from "./pages/Offices/Dashboard/Dashboard";
import OfficeReports from "./pages/Offices/Reports/Reports";
import Deadline from "./pages/Admin/Deadline/Deadline";

function App() {
  // logout user after 30 minutes of inactivity
  UseAutoLogout();
  // useIdleTimeout();
  // console.log(useIdleTimeout());
  const adminLinks = [
    { title: "Dashboard", path: "/dashboard", component: <Dashboard /> },
    { title: "Scan Now", path: "/scan-now", component: <ScanNow /> },
    { title: "Documents", path: "/documents", component: <Documents /> },
    // {
    //   title: "Upload Documents",
    //   path: "/upload-documents",
    //   component: <UploadDocuments />,
    // },
    {
      title: "Document Workflow",
      path: "/document-workflow",
      component: <DocumentWorkflow />,
    },
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
      title: "Print QR Code",
      path: "/admin-document/:tracking_number",
      component: <PrintQRCode />,
    },
    { title: "Deadlines", path: "/deadlines", component: <Deadline /> },
  ];

  const facultyLinks = [
    {
      title: "Reports",
      path: "/faculty-reports",
      component: <FacultyReports />,
    },
    {
      title: "All Documents",
      path: "/faculty/all-documents",
      component: <AllDocuments />,
    },
    {
      title: "Print QR Code",
      path: "/faculty-document/:tracking_number",
      component: <PrintQRCode />,
    },
  ];

  const esuCampusLinks = [
    {
      title: "Dashboard",
      path: "/esu-campus/dashboard",
      component: <EsuDashboard />,
    },
    {
      title: "Scan Now",
      path: "/esu-campus/scan-now",
      component: <ScanNow />,
    },
    {
      title: "Documents",
      path: "/esu-campus/documents",
      component: <EsuDocuments />,
    },

    {
      title: "Faculties",
      path: "/esu-campus/faculties",
      component: <EsuFaculties />,
    },
    {
      title: "Reports",
      path: "/esu-campus/reports",
      component: <EsuReports />,
    },
    {
      title: "Transmittal",
      path: "/esu-campus/transmittal",
      component: <EsuTransmittal />,
    },
  ];

  const officeLinks = [
    {
      title: "Dashboard",
      path: "/office/dashboard",
      component: <OfficeDashboard />,
      allowedRoles: [rolesList.office, rolesList.office_staff],
    },
    {
      title: "Scan Now",
      path: "/office/scan-now",
      component: <ScanNow />,
      allowedRoles: [rolesList.office, rolesList.office_staff], // Allow both roles
    },
    {
      title: "Documents",
      path: "/office/documents",
      component: <OfficeDocument />,
      allowedRoles: [rolesList.office, rolesList.office_staff],
    },
    {
      title: "Reports",
      path: "/office/reports",
      component: <OfficeReports />,
      allowedRoles: [rolesList.office, rolesList.office_staff], // Only office users
    },
    {
      title: "Staff",
      path: "/office-staff",
      component: <Staff />,
      allowedRoles: [rolesList.office], // Only office users
    },
  ];

  const sharedLinks = [
    {
      title: "Document Details",
      path: "/document-details/:id",
      component: <DocumentDetails />,
    },
    {
      title: "Upload Documents",
      path: "/upload-documents",
      component: <UploadDocuments />,
    },
    {
      title: "Print QR Code",
      path: "/document/tracking-number/:tracking_number",
      component: <PrintQRCode />,
    },
    {
      title: "User Profile",
      path: "/user-profile",
      component: <UserProfile />,
    },
    {
      title: "User Details",
      path: "/user-details/:id",
      component: <UserDetails />,
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
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
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
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                allowedRoles={[rolesList.faculty]}
              />
            }
          />
        ))}

        {esuCampusLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              <ProtectedRoute
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                // allowedRoles={[rolesList.campus_admin, rolesList.registrar]}
                allowedRoles={
                  link.path === "/esu-campus/transmittal"
                    ? [rolesList.campus_admin] // Only campus admin can access Transmittal
                    : [rolesList.campus_admin, rolesList.registrar] // Other routes accessible by both
                }
              />
            }
          />
        ))}

        {officeLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              <ProtectedRoute
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                allowedRoles={link.allowedRoles}
              />
            }
          />
        ))}

        {sharedLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              // <LayoutDashboard>{link.component}</LayoutDashboard>
              <ProtectedRoute
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                allowedRoles={[
                  rolesList.faculty,
                  rolesList.admin,
                  rolesList.campus_admin,
                  rolesList.registrar,
                  rolesList.office,
                  rolesList.office_staff,
                ]}
              />
            }
          />
        ))}

        {/* Not found page */}
        {/* <Route path="/scan-qr-code" element={<Scanner />} /> */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
