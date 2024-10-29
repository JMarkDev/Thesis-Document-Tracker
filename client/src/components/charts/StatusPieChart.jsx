import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const COLORS = [
  "#93e6c9", // Received
  "#92b3f0", // Incoming
  "#f0adad", // Delayed
  "#f6c343", // New color
  "#b3e5fc", // New color
  "#e57373", // New color
  "#8d6e63", // New color
  "#64b5f6", // New color
  "#ba68c8", // New color
  "#ffd54f", // New color
  "#aed581", // New color
  "#ff7043", // New color
  "#90a4ae", // New color
];

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartComponent = ({ data }) => {
  // Create a new filtered array from the data
  // const filtered =
  //   data?.map((item) => ({
  //     name: item.title.replace(/documents/i, "").trim(), // Adjust according to your data structure
  //     value: item.value, // Assuming `value` is the correct property for the count
  //   })) || [];

  // console.log(filtered);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const roundedPercent = Math.round(percent * 100);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${roundedPercent}%`}
      </text>
    );
  };

  return (
    <div className="bg-white border-2 border-gray-200 shadow-lg">
      <div className="p-2 bg-gray-300 justify-between items-center">
        <h1 className="font-bold">Document Status Charts</h1>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index] || getRandomColor()} // Use predefined color or generate new one
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid lg:grid-cols-3 text-sm lg:text-md  gap-2 justify-center mx-auto items-center px-2">
        {data?.map((item, index) => (
          <div key={`color-${index}`} className="flex mb-2 ">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: COLORS[index] || getRandomColor() }}
            ></div>
            <div className="flex gap-2">
              <p className="flex text-[12px] cursor-pointer text-gray-800 font-bold ">
                {item.value}
              </p>
              <p className="flex text-[12px] cursor-pointer text-gray-800 font-bold ">
                {item.title.replace(/documents/i, "").trim()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array,
};

export default PieChartComponent;
