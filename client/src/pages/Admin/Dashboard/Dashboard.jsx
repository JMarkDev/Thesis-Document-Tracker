import Cards from "../../../components/Cards";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/YearDropdown";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className=" flex flex-wrap">
        <Cards />
      </div>
      <div className="mt-10">
        <div className=":w-3/5 w-full">
          <div className="flex p-2 bg-gray-400 justify-between items-center">
            <h1 className=" font-bold">Documents Chart</h1>
            <YearDropdown />
          </div>

          <LineChartAdmin />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
