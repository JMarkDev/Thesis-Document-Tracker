import "./otp.css";
const VerifyOTP = () => {
  return (
    <div>
      <form className="otp-Form">
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your mobile number
        </p>
        <div className="inputContainer">
          <input
            required="required"
            maxLength="1"
            type="text"
            className="otp-input"
            id="otp-input1"
          />
          <input
            required="required"
            maxLength="1"
            type="text"
            className="otp-input"
            id="otp-input2"
          />
          <input
            required="required"
            maxLength="1"
            type="text"
            className="otp-input"
            id="otp-input3"
          />
          <input
            required="required"
            maxLength="1"
            type="text"
            className="otp-input"
            id="otp-input4"
          />
        </div>
        <button className="verifyButton" type="submit">
          Verify
        </button>
        <button className="exitBtn">×</button>
        <p className="resendNote">
          Didn&apos;t receive the code?{" "}
          <button className="resendBtn">Resend Code</button>
        </p>
      </form>
    </div>
  );
};

export default VerifyOTP;
