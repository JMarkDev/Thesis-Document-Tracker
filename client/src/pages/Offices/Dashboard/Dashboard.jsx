import Cards from "../../../components/Cards";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/Dropdown";
import PieChart from "../../../components/charts/PieChart";

const OfficeDashboard = () => {
  const year = [2024, 2025, 2026, 2027];

  const cardData = [
    { title: "Total Documents", value: 100 },
    { title: "Received Documents", value: 100 },
    { title: "Incoming Documents", value: 100 },
    { title: "Delayed Documents", value: 100 },
  ];
  const sampleData = [
    { status: "Completed", totalCount: 100 },
    { status: "Incoming", totalCount: 50 },
    { status: "Delayed", totalCount: 25 },
  ];
  return (
    <div className="w-full">
      <div className=" flex flex-wrap">
        <Cards data={cardData} />
      </div>
      <div className="flex justify-between lg:flex-row flex-col gap-5 mt-10">
        <div className=" w-full bg-white">
          <div className="flex p-2 bg-gray-400 justify-between items-center">
            <h1 className=" font-bold">Documents Received Chart</h1>
            <YearDropdown data={year} option={year[0]} />
          </div>

          <LineChartAdmin />
        </div>
        <div className="min-w-[350px]">
          <PieChart sampleData={sampleData} />
        </div>
      </div>
    </div>
  );
};

export default OfficeDashboard;
