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
import EsuCampusScan from "./pages/EsuCampus/EsuCampusScan/EsuCampusScan";

import LayoutDashboard from "./components/layout/LayoutDashboard";
// import Upload from "./pages/Faculty/UploadDocuments/UploadDocuments";
import FacultyReports from "./pages/Faculty/Reports/FacultyReports";
import AllDocuments from "./pages/Faculty/AllDocuments/AllDocuments";
import FacultyScan from "./pages/Faculty/FacultyScan/FacultyScan";
import FacultyDocumentDetails from "./pages/Faculty/AllDocuments/DocumentDetails";

import UserProfile from "./pages/Shared/UserProfile";
import UserDetails from "./pages/Shared/UserDetails";
// import DocumentDetails from "./pages/Shared/DocumentDetails";
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
import OfficeScan from "./pages/Offices/OfficeScan/OfficeScan";

import EsuCampusDocumentDetails from "./pages/EsuCampus/Documents/EsuCampusDocumentDetails";
import AdminDocumentDetails from "./pages/Admin/Documents/AdminDocumentDetails";
import OfficeDocumentDetails from "./pages/Offices/Documents/OfficeDocumentDetails";

import Settings from "./pages/Admin/Settings/Settings";

function App() {
  // logout user after  minutes of inactivity
  // UseAutoLogout();
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
      path: "/users/campus-administrator",
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
    {
      title: "Document Details",
      path: "/admin-document-details/:id",
      component: <AdminDocumentDetails />,
    },
    {
      title: "Settings",
      path: "/settings",
      component: <Settings />,
    },
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
      title: "Document Details",
      path: "/faculty-document-details/:id",
      component: <FacultyDocumentDetails />,
    },
    { title: "Scan Now", path: "/faculty-scan", component: <FacultyScan /> },
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
      component: <EsuCampusScan />,
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
    {
      title: "Document Details",
      path: "/esu-campus-document-details/:id",
      component: <EsuCampusDocumentDetails />,
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
      component: <OfficeScan />,
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
    {
      title: "Document Details",
      path: "/office-document-details/:id",
      component: <OfficeDocumentDetails />,
      allowedRoles: [rolesList.office, rolesList.office_staff], // Only office users
    },
  ];

  const sharedLinks = [
    // {
    //   title: "Document Details",
    //   path: "/document-details/:id",
    //   component: <DocumentDetails />,
    // },
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
      {/* 
      auto logout user after  minutes of inactivity
    */}
      <UseAutoLogout />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        {adminLinks?.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              <ProtectedRoute
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                allowedRoles={[rolesList.admin, rolesList.admin_staff]}
              />
            }
          />
        ))}

        {facultyLinks?.map((link, index) => (
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

        {esuCampusLinks?.map((link, index) => (
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

        {officeLinks?.map((link, index) => (
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

        {sharedLinks?.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={
              // <LayoutDashboard>{link.component}</LayoutDashboard>
              <ProtectedRoute
                element={<LayoutDashboard>{link.component}</LayoutDashboard>}
                allowedRoles={
                  link.path === "/upload-documents"
                    ? [
                        rolesList.faculty,
                        rolesList.admin,
                        rolesList.campus_admin,
                        rolesList.registrar,
                        rolesList.admin_staff,
                      ]
                    : [
                        rolesList.faculty,
                        rolesList.admin,
                        rolesList.campus_admin,
                        rolesList.registrar,
                        rolesList.office,
                        rolesList.office_staff,
                        rolesList.admin_staff,
                      ]
                }
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
