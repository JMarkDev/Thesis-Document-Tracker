// import "./styles.css";
// import { useState } from "react";
// import QrReader from "react-qr-reader";

// const App = () => {
//   const [selected, setSelected] = useState("environment");
//   const [startScan, setStartScan] = useState(false);
//   const [loadingScan, setLoadingScan] = useState(false);
//   const [data, setData] = useState("");

//   const handleScan = async (scanData) => {
//     setLoadingScan(true);
//     console.log(`loaded data data`, scanData);
//     if (scanData && scanData !== "") {
//       console.log(`loaded >>>`, scanData);
//       setData(scanData);
//       setStartScan(false);
//       setLoadingScan(false);
//       // setPrecScan(scanData);
//     }
//   };
//   const handleError = (err) => {
//     console.error(err);
//   };
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>
//         Last Scan:
//         {selected}
//       </h2>

//       <button
//         onClick={() => {
//           setStartScan(!startScan);
//         }}
//       >
//         {startScan ? "Stop Scan" : "Start Scan"}
//       </button>
//       {startScan && (
//         <>
//           <select onChange={(e) => setSelected(e.target.value)}>
//             <option value={"environment"}>Back Camera</option>
//             <option value={"user"}>Front Camera</option>
//           </select>
//           <QrReader
//             facingMode={selected}
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             // chooseDeviceId={()=>selected}
//             style={{ width: "300px" }}
//           />
//         </>
//       )}
//       {loadingScan && <p>Loading</p>}
//       {data !== "" && <p>{data}</p>}
//     </div>
//   );
// };

// export default App;
import "./styles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";

const App = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.name === "NotAllowedError") {
      alert(
        "Camera permission denied. Please allow camera access in your browser settings."
      );
    } else if (err.name === "NotFoundError") {
      alert("No camera found. Please ensure your device has a camera.");
    } else {
      alert("An unexpected error occurred: " + err.message);
    }
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // Permission granted
      console.log("Camera permission granted");
    } catch (error) {
      // Permission denied or error occurred
      console.error("Camera permission denied or error occurred:", error);
      alert(
        "Camera permission is required to scan QR codes. Please allow access."
      );
    }
  };

  const handleStartScan = async () => {
    await requestCameraPermission();
    setStartScan(!startScan);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Last Scan: {selected}</h2>

      <button onClick={handleStartScan}>
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>

      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />
        </>
      )}

      {loadingScan && <p>Loading...</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default App;
