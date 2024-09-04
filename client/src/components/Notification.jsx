import PropTypes from "prop-types";
import {useFormat} from "../hooks/useFormatDate";

const Notification = ({notifications}) => {
   const { dateFormat } = useFormat();
  
  return (
    <div className="relative z-50 w-[320px]  shadow-lg bg-white rounded-lg ">
      <h1 className="text-gray-800 p-2 font-bold border-b border-gray-200 md:text-lg">Notifications</h1>
      <div className="h-[400px] rounded-b-lg  overflow-y-auto">
        <ul className="bg-red-500">
          {notifications.length === 0 && <li className="p-4 text-sm">No notifications</li>}
          {notifications?.map(({content, createdAt, is_read}, id) => (
            <li key={id} className={`border-b border-gray-300 ${is_read === 1 ? "bg-white" : "bg-gray-100"}  hover:bg-gray-200 cursor-pointer p-4 text-sm`}>
              <p className="font-semibold text-gray-700">
                {content}
              </p>
              <p className="text-gray-500 border-gray-300 text-sm">
                {dateFormat(createdAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array,
};


export default Notification;
