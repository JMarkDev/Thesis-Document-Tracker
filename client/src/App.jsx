import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";
import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./pages/Faculty/Profile";
import ScanNow from "./pages/Admin/ScanNow/ScanNow";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Documents from "./pages/Admin/Documents/Documents";
import DocumentWorkflow from "./pages/Admin/DocumentWorkflows/DocumentWorkflow";
import Offices from "./pages/Admin/Offices/Offices";
import Reports from "./pages/Admin/Reports/Reports";
import Faculty from "./pages/Admin/UserMagement/Faculty";
import CampusAdmin from "./pages/Admin/UserMagement/CampusAdmin";
import EsuRegistrar from "./pages/Admin/UserMagement/EsuRegistrar";
import AdminStaff from "./pages/Admin/UserMagement/AdminStaff";
import DocumentMetadata from "./components/DocumentMetadata";

function App() {
  const adminLinks = [
    { title: "Dashboard", path: "/dashboard", component: <Dashboard /> },
    { title: "Scan Now", path: "/scan-now", component: <ScanNow /> },
    { title: "Documents", path: "/documents", component: <Documents /> },
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
      title: "Document Details",
      path: "/documents/:id",
      component: <DocumentMetadata />,
    },
  ];
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        {adminLinks.map((link, index) => (
          <Route
            key={index}
            path={link.path}
            element={<LayoutAdmin>{link.component}</LayoutAdmin>}
          />
        ))}

        {/* Not found page */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
