import Cards from "../../../components/Cards";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/Dropdown";
import PieChart from "../../../components/charts/PieChart";

const Dashboard = () => {
  const year = [2024, 2025, 2026, 2027];
  return (
    <div className="w-full">
      <div className=" flex flex-wrap">
        <Cards />
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
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
