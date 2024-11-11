// import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import useColorGenerator from "../../hooks/useColorGenerator";
import PropTypes from "prop-types";

const HistogramAdmin = ({ data }) => {
  // const { getNextColors, usedColors } = useColorGenerator();
  // / Define an array of colors to use for each bar
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#413ea0"];

  return (
    <div className="w-full shadow-xl mt-4">
      <div className="histogramChart">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="month" />
            <YAxis width={24} />
            <Tooltip />
            {/** Render bars for each data key, excluding 'month' */}
            {data &&
              data.length > 0 &&
              Object.keys(data[0])
                .filter((key) => key !== "month")
                .map((key, index) => (
                  <Bar
                    key={index}
                    dataKey={key}
                    fill={colors[index % colors.length]} // fill={usedColors[index] || getNextColors()}
                    barSize={30}
                  />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

HistogramAdmin.propTypes = {
  data: PropTypes.array,
};

export default HistogramAdmin;
