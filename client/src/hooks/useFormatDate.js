export const useFormat = () => {
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthNameCut = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateFormat = (date) => {
    if (date) {
      const month = parseInt(date.substring(5, 7), 10) - 1;
      const day = date.substring(8, 10);
      const year = date.substring(0, 4);

      const hour = parseInt(date.substring(11, 13), 10);
      const period = hour >= 12 ? "PM" : "AM";
      const minutes = date.substring(14, 16);

      // convert to 12 hour format
      const formatedHour = hour % 12 === 0 ? 12 : hour % 12;

      return `${monthNameCut[month]} ${day}, ${year}, ${formatedHour}:${minutes} ${period}`;
    }
  };

  const fullDateFormat = (date) => {
    if (date) {
      const month = parseInt(date.substring(5, 7), 10) - 1;
      const day = date.substring(8, 10);
      const year = date.substring(0, 4);

      const hour = parseInt(date.substring(11, 13), 10);
      const period = hour >= 12 ? "PM" : "AM";
      const minutes = date.substring(14, 16);

      // convert to 12 hour format
      const formatedHour = hour % 12 === 0 ? 12 : hour % 12;

      return `${monthName[month]}  ${day}, ${year}, ${formatedHour}:${minutes} ${period}`;
    }
  };

  return { dateFormat, fullDateFormat };
};
export default useFormat;
