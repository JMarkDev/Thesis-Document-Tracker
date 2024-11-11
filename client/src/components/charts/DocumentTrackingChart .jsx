import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Function to generate a random color for each line
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to transform the document list data for the chart
const transformData = (documentList) => {
  const result = {};

  documentList.forEach((document) => {
    const { tracking_number, document_histories } = document;

    document_histories.forEach(({ action, createdAt }) => {
      const date = createdAt.split("T")[0]; // Extract date (YYYY-MM-DD)

      // Initialize the tracking number and date in result if not exist
      if (!result[date]) {
        result[date] = { date };
      }

      if (!result[date][tracking_number]) {
        result[date][tracking_number] = {
          uploaded: 0,
          received: 0,
          forwarded: 0,
        };
      }

      // Increment the count for each action on this date for the tracking number
      result[date][tracking_number][action] += 1;
    });
  });

  // Convert the result into an array that Recharts can use, with each tracking number's data merged by date
  return Object.values(result).map((dateEntry) => {
    const entry = { date: dateEntry.date };

    Object.keys(dateEntry).forEach((trackingNumber) => {
      if (trackingNumber !== "date") {
        entry[`${trackingNumber}_uploaded`] =
          dateEntry[trackingNumber].uploaded || 0;
        entry[`${trackingNumber}_received`] =
          dateEntry[trackingNumber].received || 0;
        entry[`${trackingNumber}_forwarded`] =
          dateEntry[trackingNumber].forwarded || 0;
      }
    });

    return entry;
  });
};

// The chart component itself
const DocumentTrackingChart = ({ documentList }) => {
  const chartData = transformData(documentList);

  return (
    <div className="w-full shadow-xl mt-4">
      <h3 className="text-center font-bold">Document Tracking History</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Dynamically create lines for each document's actions */}
          {chartData.length > 0 &&
            Object.keys(chartData[0])
              .filter((key) => key !== "date")
              .map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={getRandomColor()} // Assign a unique color to each line
                />
              ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

DocumentTrackingChart.propTypes = {
  documentList: PropTypes.array,
};

export default DocumentTrackingChart;
