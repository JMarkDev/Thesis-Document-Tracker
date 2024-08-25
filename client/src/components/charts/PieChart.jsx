import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const COLORS = [
  "#93e6c9", // Received
  "#92b3f0", // Incoming
  "#f0adad", // Delayed
];

const sampleData = [
  { status: "Completed", totalCount: 100 },
  { status: "Incoming", totalCount: 50 },
  { status: "Delayed", totalCount: 25 },
];

const PieChartComponent = () => {
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
    <div className="bg-white shadow-lg">
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
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 justify-center mx-auto items-center">
        {sampleData.map((item, index) => (
          <div
            key={`color-${index}`}
            className="flex justify-start items-center mx-auto mb-5"
          >
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <p className="flex cursor-pointer text-gray-800 font-bold justify-center items-center mx-auto">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  sampleData: PropTypes.object,
};

export default PieChartComponent;
