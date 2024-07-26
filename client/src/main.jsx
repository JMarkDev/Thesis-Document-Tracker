import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./hooks/useToast.jsx";
import { AuthProvider } from "./AuthContext/AuthContext.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import Cookie from "js-cookie";

import {
  fetchUsers,
  fetchAdmin,
  fetchOffice,
  fetchRegistrar,
  fetchFaculty,
  fetchCampusAdmin,
} from "./services/usersSlice.js";
import { fetchAllDocuments } from "./services/documentSlice.js";

const token = Cookie.get("accessToken");
//This ensures that the data is already available in the Redux store when the application starts, which can improve the user experience by preventing loading delays.
if (token) {
  store.dispatch(fetchUsers());
  store.dispatch(fetchAdmin());
  store.dispatch(fetchOffice());
  store.dispatch(fetchRegistrar());
  store.dispatch(fetchCampusAdmin());
  store.dispatch(fetchFaculty());

  // document data
  store.dispatch(fetchAllDocuments());
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Router>
    </AuthProvider>
  </Provider>

  // </React.StrictMode>
);
