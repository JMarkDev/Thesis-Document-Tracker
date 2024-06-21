import { useEffect, useState } from "react";
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

const cardData = [
  {
    month: "Jan",
    "IDP Pagadian Campus": 10,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Feb",
    "IDP Pagadian Campus": 30,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Mar",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Apr",
    "IDP Pagadian Campus": 40,
    "DTR Pagadian Campus": 20,
    "IOR Pagadian Campus": 10,
  },
  {
    month: "May",
    "IDP Pagadian Campus": 30,
    "DTR Pagadian Campus": 40,
    "IOR Pagadian Campus": 50,
  },
  {
    month: "Jun",
    "IDP Pagadian Campus": 10,
    "DTR Pagadian Campus": 20,
    "IOR Pagadian Campus": 30,
  },
  {
    month: "Jul",
    "IDP Pagadian Campus": 60,
    "DTR Pagadian Campus": 40,
    "IOR Pagadian Campus": 30,
  },
  {
    month: "Aug",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Sep",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Oct",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Nov",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
  {
    month: "Dec",
    "IDP Pagadian Campus": 50,
    "DTR Pagadian Campus": 30,
    "IOR Pagadian Campus": 20,
  },
];

const LineChartAdmin = () => {
  const [data, setData] = useState([]);
  const { getNextColors, usedColors } = useColorGenerator();

  useEffect(() => {
    setData(cardData);
  }, []);

  return (
    <div className="w-full mt-4">
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
            <YAxis />
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

export default LineChartAdmin;
