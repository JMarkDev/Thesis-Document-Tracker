import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./hooks/useToast.jsx";
import { AuthProvider } from "./AuthContext/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <Router>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>
  </AuthProvider>

  // </React.StrictMode>
);
