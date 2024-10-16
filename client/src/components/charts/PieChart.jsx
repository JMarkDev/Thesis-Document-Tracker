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

const PieChartComponent = ({ sampleData }) => {
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
      <div>
        <ResponsiveContainer width="100%" height={370}>
          <PieChart>
            <Pie
              data={sampleData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="totalCount"
            >
              {sampleData?.map((entry, index) => (
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
        {sampleData.map((item, index) => (
          <div key={`color-${index}`} className="flex  mb-5">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: COLORS[index] || getRandomColor() }}
            ></div>
            <p className="flex cursor-pointer text-gray-800 font-bold ">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  sampleData: PropTypes.array,
};

export default PieChartComponent;
