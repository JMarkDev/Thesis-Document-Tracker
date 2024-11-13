import PropTypes from "prop-types";
import { useFormat } from "../hooks/useFormatDate";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/authSlice";
import { useSelector } from "react-redux";
import rolesList from "../constants/rolesList";

const Notification = ({ notifications, handleNotificationClick }) => {
  const { dateFormat } = useFormat();
  const navigate = useNavigate();
  const user = useSelector(getUserData);

  const handleNavigate = () => {
    if (user?.role === rolesList.admin) {
      navigate(`/users/faculty`);
    } else if (user?.role === rolesList.admin_staff) {
      navigate(`/users/faculty`);
    } else if (user?.role === rolesList.registrar) {
      navigate(`/esu-campus/faculties`);
    } else if (user?.role === rolesList.campus_admin) {
      navigate(`/esu-campus/faculties`);
    }
  };

  return (
    <div className="relative z-100 w-[320px]  shadow-lg bg-white rounded-lg ">
      <h1 className="text-gray-800 p-2 font-bold border-b border-gray-200 md:text-lg">
        Notifications
      </h1>
      <div className="h-[400px] rounded-b-lg  overflow-y-auto">
        <ul className="bg-gray-200">
          {notifications.length === 0 && (
            <li className="p-4 text-sm text-gray-700">No notifications</li>
          )}
          {notifications?.map(
            ({ content, createdAt, is_read, document_id, id, faculty_id }) => (
              <li
                key={id}
                onClick={() => {
                  handleNotificationClick(id);
                  handleNavigate(faculty_id);

                  {
                    document_id && navigate(`/document-details/${document_id}`);
                  }
                }}
                className={`border-b border-gray-300 ${
                  is_read === 1 ? "bg-white" : "bg-gray-200"
                }  hover:bg-gray-200 cursor-pointer p-4 text-sm`}
              >
                <p className="font-semibold text-gray-700">{content}</p>
                <p className="text-gray-500 border-gray-300 text-sm">
                  {dateFormat(createdAt)}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array,
  handleNotificationClick: PropTypes.func,
};

export default Notification;
