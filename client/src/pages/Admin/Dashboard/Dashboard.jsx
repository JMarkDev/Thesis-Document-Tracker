import Cards from "../../../components/Cards";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/Dropdown";
import PieChart from "../../../components/charts/PieChart";
import ChartByESU from "../../../components/charts/ChartByESU";

const Dashboard = () => {
  const cardData = [
    { title: "Total Documents", value: 100 },
    { title: "Received Documents", value: 100 },
    { title: "Incoming Documents", value: 100 },
    { title: "Delayed Documents", value: 100 },
    { title: "Documents types", value: 100 },
    { title: "Total Offices", value: 100 },
    { title: "Total ESU Campus", value: 100 },
    { title: "Total Faculties", value: 100 },
  ];
  const year = [2024, 2025, 2026, 2027];

  const campusData = [
    { campus: "ALICIA", documents: 10 },
    { campus: "AURORA", documents: 12 },
    { campus: "DIPLAHAN", documents: 8 },
    { campus: "IMELDA", documents: 14 },
    { campus: "IPIL", documents: 9 },
    { campus: "MABUHAY", documents: 11 },
    { campus: "MALANGAS", documents: 7 },
    { campus: "NAGA", documents: 6 },
    { campus: "OLUTANGA", documents: 13 },
    { campus: "PAGADIAN", documents: 15 },
    { campus: "SIAY", documents: 10 },
    { campus: "TUNGAWAN", documents: 9 },
  ];

  const sampleData = [
    { status: "Completed", totalCount: 100 },
    { status: "Incoming", totalCount: 50 },
    { status: "Delayed", totalCount: 25 },
  ];

  const documentType = [
    { status: "DTR (Daily Time Record)", totalCount: 100 },
    { status: "IOR (Internal Office Reports)", totalCount: 50 },
    { status: "IDP (Individual Development Plans", totalCount: 25 },
    { status: "Sample 1", totalCount: 100 },
    { status: "Sample 2", totalCount: 50 },
    { status: "Sample 3", totalCount: 25 },
  ];

  return (
    <div className="w-full">
      <div className=" flex flex-wrap">
        <Cards data={cardData} />
      </div>
      <div className="flex justify-between xl:flex-row flex-col gap-5 mt-10">
        <div className=" w-full bg-white">
          <div className="flex p-4 bg-gray-300 justify-between items-center">
            <h1 className=" font-bold">Documents Received Chart</h1>
            <YearDropdown data={year} option={year[0]} />
          </div>

          <LineChartAdmin />
        </div>
        <div className="min-w-[350px]">
          <PieChart sampleData={sampleData} />
        </div>
      </div>
      {/* <div>
        <div className="min-w-[350px]">
          <PieChart />
        </div>
      </div> */}
      <div className="mt-10">
        <h2 className="font-bold p-4 bg-gray-300">
          Submitted Documents by WMSU-ESU Campus
        </h2>
        <ChartByESU data={campusData} />
      </div>
      <div className="mt-10">
        <h2 className="font-bold p-4 bg-gray-300">Document Type Charts</h2>
        <PieChart sampleData={documentType} />
      </div>
    </div>
  );
};

export default Dashboard;
