import { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import PropTypes from "prop-types";

const LineChartDocumentSubmissions = ({ data }) => {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    // Group documents by submission date
    const groupedByDate = data.reduce((acc, curr) => {
      const submissionDate = dayjs(curr.createdAt).format("YYYY-MM-DD");
      if (!acc[submissionDate]) {
        acc[submissionDate] = 1;
      } else {
        acc[submissionDate]++;
      }
      return acc;
    }, {});

    // Transform grouped data into an array for Recharts
    const chartData = Object.keys(groupedByDate).map((date) => ({
      date,
      count: groupedByDate[date],
    }));

    setTransformedData(chartData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartDocumentSubmissions.propTypes = {
  data: PropTypes.array,
};

export default LineChartDocumentSubmissions;
