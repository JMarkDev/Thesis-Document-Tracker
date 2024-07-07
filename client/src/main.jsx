import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./hooks/useToast.jsx";
import { AuthProvider } from "./AuthContext/AuthContext.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

import { fetchUsers, fetchOffice } from "./services/usersSlice.js";

//This ensures that the data is already available in the Redux store when the application starts, which can improve the user experience by preventing loading delays.
store.dispatch(fetchUsers());
store.dispatch(fetchOffice());

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
