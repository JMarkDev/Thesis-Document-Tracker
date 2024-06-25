import PropTypes from "prop-types";
import "./otp.css";
import sentImage from "../../assets/images/send-email.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import LoginLoading from "../../components/loader/LoginLoading";

const VerifyOTP = ({ email, closeOTP }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      // Ensuring only digits are entered
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Automatically focus the next input if a digit is entered
      if (value && index < 3) {
        document.getElementById(`otp-input${index + 2}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    setLoading(true);
    e.preventDefault();

    const data = {
      email: email,
      otp: otp.join(""),
    };
    try {
      const response = await api.post("/auth/verify-otp", data);
      console.log(response.data);

      if (response.data.status === "success") {
        closeOTP();
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error.response);
      setLoading(false);
    }
  };

  const disableSubmit = otp.includes("") || otp.length < 4;

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="fixed inset-0 z-[40] px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-40 font-normal"
    >
      {loading && <LoginLoading />}

      <form className="otp-Form" onSubmit={handleSubmit}>
        <span className="mainHeading">Enter OTP</span>
        <img src={sentImage} alt="" className="w-32" />
        <p className="otpSubheading">
          Please enter the 4 digit OTP sent to <span>{email}</span>
        </p>
        <div className="inputContainer">
          {otp.map((digit, index) => (
            <input
              key={index}
              required
              maxLength="1"
              type="text"
              className="otp-input"
              id={`otp-input${index + 1}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        {errorMessage && (
          <span className="text-red-600 text-sm">{errorMessage}</span>
        )}

        <button
          disabled={disableSubmit ? true : false}
          className={`verifyButton ${
            disableSubmit ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          type="submit"
        >
          Verify
        </button>
        <button className="exitBtn" type="button" onClick={closeOTP}>
          ×
        </button>
        <p className="resendNote">
          Didn&apos;t receive the code?{" "}
          <button className="resendBtn" type="button">
            Resend Code
          </button>
        </p>
      </form>
    </div>
  );
};

VerifyOTP.propTypes = {
  email: PropTypes.string.isRequired,
  closeOTP: PropTypes.func.isRequired,
};

export default VerifyOTP;
