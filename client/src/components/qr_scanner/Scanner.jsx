import "./styles.css";
import { useState, useEffect } from "react";
import QrReader from "react-qr-reader";

const App = () => {
  const [selected, setSelected] = useState("environment"); // Default to environment camera
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  // Function to detect if the user is on a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleScan = async (scanData) => {
    console.log("click");
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
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera permission granted");
    } catch (error) {
      console.error("Camera permission denied or error occurred:", error);
    }
  };

  const handleStartScan = async () => {
    await requestCameraPermission();
    setStartScan(!startScan);
  };

  useEffect(() => {
    // Automatically select the camera based on the device type
    if (startScan) {
      const facingMode = isMobileDevice() ? "environment" : "user"; // Set to back camera on mobile
      setSelected(facingMode);
    }
  }, [startScan]);

  console.log(startScan, "startScan");
  console.log(loadingScan, "loadingScan");

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Last Scan: {selected}</h2>

      <button onClick={handleStartScan}>
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>

      {startScan && (
        <>
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
