// import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../services/authSlice";
// import api from '../api/axios'

// export const UseAutoLogout = () => {
//   const dispatch = useDispatch();
//   const inactivityTimer = useRef(null);
//   const [autoLogoutThreshold, setAutoLogoutThreshold] = useState(0);
//   const INACTIVITY_LIMIT = 15 * 60 * 1000;

//   useEffect(() => {
//     const getDelay = async () => {
//       try {
//         const response = await api.get("/document/get-delay/1");
//         setAutoLogoutThreshold(response.data.auto_logout_minutes);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getDelay();
//   }, []);

//   const resetTimer = () => {
//     clearTimeout(inactivityTimer.current);
//     inactivityTimer.current = setTimeout(() => {
//       dispatch(logoutUser());
//     }, INACTIVITY_LIMIT);
//   };

//   const handleActivity = () => {
//     resetTimer();
//   };

//   useEffect(() => {
//     resetTimer();
//     const events = [
//       "mousemove",
//       "mousedown",
//       "keypress",
//       "keydown",
//       "scroll",
//       "touchstart",
//       "click",
//     ];
//     events.forEach((event) => window.addEventListener(event, handleActivity));

//     return () => {
//       events.forEach((event) =>
//         window.removeEventListener(event, handleActivity)
//       );
//       clearTimeout(inactivityTimer.current);
//     };
//   }, []);

//   return null;
// };

// // export default useAutoLogout;
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/authSlice";
import api from "../api/axios";

export const UseAutoLogout = () => {
  const dispatch = useDispatch();
  const inactivityTimer = useRef(null);
  const [autoLogoutThreshold, setAutoLogoutThreshold] = useState(0);

  // Fetch the auto-logout delay once
  useEffect(() => {
    const getDelay = async () => {
      try {
        const response = await api.get("/document/get-delay/1");
        setAutoLogoutThreshold(response.data.auto_logout_minutes);
      } catch (error) {
        console.log(error);
      }
    };
    getDelay();
  }, []);

  // Check if user should be logged out on component mount
  useEffect(() => {
    if (autoLogoutThreshold > 0) {
      const lastActivity = localStorage.getItem("lastActivityTime");
      const INACTIVITY_LIMIT = autoLogoutThreshold * 60 * 1000;

      if (lastActivity && Date.now() - lastActivity > INACTIVITY_LIMIT) {
        dispatch(logoutUser());
      } else {
        resetTimer();
      }
    }
  }, [autoLogoutThreshold]);

  const resetTimer = () => {
    clearTimeout(inactivityTimer.current);

    if (autoLogoutThreshold > 0) {
      const INACTIVITY_LIMIT = autoLogoutThreshold * 60 * 1000;

      inactivityTimer.current = setTimeout(() => {
        dispatch(logoutUser());
      }, INACTIVITY_LIMIT);

      // Update last activity time in localStorage
      localStorage.setItem("lastActivityTime", Date.now());
    }
  };

  const handleActivity = () => {
    resetTimer();
    // Update last activity time in localStorage on any activity
    localStorage.setItem("lastActivityTime", Date.now());
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(inactivityTimer.current);
    };
  }, []);

  return null;
};
