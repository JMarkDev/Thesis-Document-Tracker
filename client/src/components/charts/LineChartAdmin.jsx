// import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useColorGenerator from "../../hooks/useColorGenerator";
import PropTypes from "prop-types";

const LineChartAdmin = ({ data }) => {
  // const [data, setData] = useState([]);
  const { getNextColors, usedColors } = useColorGenerator();

  // useEffect(() => {
  //   setData(cardData);
  // }, []);

  return (
    <div className="w-full shadow-xl mt-4">
      <div className="lineChart">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
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
            {/** Legend title of the event */}
            {/* <Legend /> */}
            {data &&
              data.length > 0 &&
              Object.keys(data[0])
                .filter((key) => key !== "month")
                .map((key, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={key}
                    stroke={usedColors[index] || getNextColors()}
                    activeDot={{ r: 8 }}
                  />
                ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

LineChartAdmin.propTypes = {
  data: PropTypes.array,
};

export default LineChartAdmin;
