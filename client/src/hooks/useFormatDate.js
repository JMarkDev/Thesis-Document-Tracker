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
    // Check if date is null or undefined
    if (!date) {
      return ""; // or return a default value, such as 'N/A'
    }

    // Check if the input is in the {val: "'YYYY/MM/DD HH:MM:SS'"} format
    if (typeof date === "object" && date.val) {
      // Extract the actual date string and remove any single quotes
      date = date.val.replace(/'/g, ""); // Remove the extra quotes
    }

    // Additional safety check for valid date string
    if (typeof date === "string" && date.length >= 16) {
      const month = parseInt(date.substring(5, 7), 10) - 1;
      const day = date.substring(8, 10);
      const year = date.substring(0, 4);

      const hour = parseInt(date.substring(11, 13), 10);
      const period = hour >= 12 ? "PM" : "AM";
      const minutes = date.substring(14, 16);

      // Convert to 12-hour format
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

      return `${monthNameCut[month]} ${day}, ${year}, ${formattedHour}:${minutes} ${period}`;
    }

    return ""; // Fallback if the date format is incorrect
  };

  const fullDateFormat = (date) => {
    console.log(date);
    if (date) {
      const month = parseInt(date.substring(5, 7), 10) - 1;
      const day = date.substring(8, 10);
      const year = date.substring(0, 4);

      const hour = parseInt(date.substring(11, 13), 10);
      const period = hour >= 12 ? "PM" : "AM";
      const minutes = date.substring(14, 16);

      // convert to 12 hour format
      const formatedHour = hour % 12 === 0 ? 12 : hour % 12;

      if (!hour) {
        return `${monthName[month]}  ${day}, ${year}`;
      }
      return `${monthName[month]}  ${day}, ${year}, ${formatedHour}:${minutes} ${period}`;
    }
  };

  return { dateFormat, fullDateFormat };
};
export default useFormat;
