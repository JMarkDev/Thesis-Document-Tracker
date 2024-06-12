import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";
import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./pages/Faculty/Profile";
import ScanNow from "./pages/Admin/ScanNow";
import LayoutAdmin from "./components/layout/LayoutAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="/*" element={<PageNotFound />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route
          path="/profile"
          element={
            <LayoutAdmin>
              <Profile />
            </LayoutAdmin>
          }
        />

        <Route
          path="/scan"
          element={
            <LayoutAdmin>
              <ScanNow />
            </LayoutAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
