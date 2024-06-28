import { useState } from "react";
import "./ProfileStyle.css";
import { FaCamera } from "react-icons/fa";
import PropTypes from "prop-types";

const Profile = ({ setValue }) => {
  const [profilePic, setProfilePic] = useState(
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        setValue("image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="row ">
      <div className="small-12 medium-2 large-2 columns  relative">
        <div className="circle">
          <img
            onClick={handleUploadButtonClick}
            className="profile-pic"
            src={profilePic}
            alt="Profile"
          />
        </div>
        <div className="p-image z-20 absolute">
          <FaCamera
            className="fa fa-camera upload-button"
            onClick={handleUploadButtonClick}
          />
          <input
            id="file-upload"
            className="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  setValue: PropTypes.func,
};

export default Profile;
